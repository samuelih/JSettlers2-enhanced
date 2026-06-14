#!/usr/bin/env python

# Read properties files to make sure props with MessageFormat.format placeholder args escape certain characters.
# Tested in python 2.7.5, 3.5.2, 3.9.12
# This file Copyright (C) 2019,2022 Jeremy D Monin <jeremy@nand.net>
# License: GPLv3

import io, os, re, unittest
from collections import OrderedDict

SRC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
MAIN_RESOURCES_DIR = os.path.join(SRC_DIR, "main", "resources")
STRINGS_DIR = os.path.join(MAIN_RESOURCES_DIR, "resources", "strings")

RE_EMPTY_LINE = re.compile(r"^\s*$")
RE_COMMENT_LINE = re.compile(r"^\s*[#!]")
RE_DATA_LINE = re.compile(r"^\s*([^=]+?)\s*=\s*(.*?)$")
SOC_SPECIAL_PLACEHOLDER_TYPES = set(["rsrcs", "list", "dcards"])

def parse_props_list(props_list):
  """Parse simple name=value Java properties lines, preserving values and line numbers.
  Returns (props, parse_errors), where props maps key -> (value, line_number).
  This parser intentionally matches the current project resource files: no line continuations.
  """
  props = OrderedDict()
  fails = []

  for linenum in range(len(props_list)):
    propline = props_list[linenum].rstrip("\r\n")
    if RE_EMPTY_LINE.search(propline) or RE_COMMENT_LINE.search(propline):
      continue
    m = RE_DATA_LINE.search(propline)
    if not m:
      fails.append( (linenum + 1, 0, "(Cannot parse this line)") )
      continue
    props[m.group(1)] = (m.group(2), linenum + 1)

  return props, fails

def check_missing_escape(localized_str):
  """ Test localized_str contents against java MessageFormat.format format, looking for missing escape chars.
  If has any positional args ({0}, {1}, ...), then single-quotes and open curly braces ("'", "{")
  which aren't a positional arg should be preceded by a single-quote to escape them.
  Returns -1 or the position of the first quote or curly brace which looks to be missing its escape char.
   """

  # look first for {\d positional args
  if not re.search(r'\{\d', localized_str):
    return -1

  # look for ' but not '' ; for { but not either '{ or {\d
  m = re.search(r"(^'[^'{])|([^']'[^'{])", localized_str)
  if m:
    pos = m.start()
    if localized_str[pos] != "'":
      pos += 1  # since start of match is before the "'"
    return pos
  m = re.search(r"([^']\{\D)|([^']\{)$", localized_str)
  if m:
    return m.start()

  return -1

def check_props_list_missing_escape(props_list):
  """ Test props_list's name=value elements against check_missing_escape.
  If no failures, returns empty list.
  If any failures, returns list of (prop_index+1, prop_char_pos, prop_name) tuples.
  Assumes each props_list element follows same format as lines from a java .properties file
  with no end-of-line \\ continuations:
  https://docs.oracle.com/javase/6/docs/api/java/util/Properties.html#load(java.io.Reader)

  This unit test parses the lines "manually" instead of using the ConfigParser module,
  to retain line numbers and prevent any interpretation of "#" chars in values as comments.
  """
  fails = []
  props, parse_errors = parse_props_list(props_list)
  fails.extend(parse_errors)

  for k, (v, linenum) in props.items():
    idx = check_missing_escape(v)
    if idx != -1:
      fails.append( (linenum, idx, k) )

  return fails

def _find_message_placeholder_end(localized_str, start_pos):
  """Find matching } for a MessageFormat placeholder at start_pos, or -1."""
  pos = start_pos + 1
  depth = 1

  while pos < len(localized_str):
    ch = localized_str[pos]
    if ch == "'":
      pos += 1
      while pos < len(localized_str):
        if localized_str[pos] == "'":
          if (pos + 1 < len(localized_str)) and (localized_str[pos + 1] == "'"):
            pos += 2
            continue
          pos += 1
          break
        pos += 1
      continue
    elif ch == "{":
      depth += 1
    elif ch == "}":
      depth -= 1
      if depth == 0:
        return pos

    pos += 1

  return -1

def message_arg_signature(localized_str):
  """Return required MessageFormat argument indexes and SoC-special placeholder types.
  Standard MessageFormat types such as number/choice are intentionally ignored,
  because translated strings may need different pluralization formats.
  """
  indexes = set()
  special_types = {}
  pos = 0
  in_quote = False

  while pos < len(localized_str):
    ch = localized_str[pos]
    if ch == "'":
      if (pos + 1 < len(localized_str)) and (localized_str[pos + 1] == "'"):
        pos += 2
        continue
      in_quote = not in_quote
      pos += 1
      continue

    if (not in_quote) and (ch == "{"):
      end_pos = _find_message_placeholder_end(localized_str, pos)
      if end_pos == -1:
        pos += 1
        continue

      ph_text = localized_str[pos + 1:end_pos].strip()
      m = re.match(r"^(\d+)\s*(?:,\s*([A-Za-z]+))?", ph_text)
      if m:
        arg_num = int(m.group(1))
        arg_type = m.group(2)
        indexes.add(arg_num)
        if arg_type in SOC_SPECIAL_PLACEHOLDER_TYPES:
          special_types[arg_num] = arg_type

      pos = end_pos + 1
      continue

    pos += 1

  return (indexes, special_types)

def check_props_placeholder_parity(base_props, localized_props):
  """Check placeholder parity for keys present in both parsed properties maps.
  Returns list of (key, base_line, localized_line, base_signature, localized_signature).
  """
  mismatches = []

  for k in sorted(localized_props.keys()):
    if k not in base_props:
      continue
    base_value, base_line = base_props[k]
    localized_value, localized_line = localized_props[k]
    base_sig = message_arg_signature(base_value)
    localized_sig = message_arg_signature(localized_value)
    if base_sig != localized_sig:
      mismatches.append( (k, base_line, localized_line, base_sig, localized_sig) )

  return mismatches

def check_props_extra_keys(base_props, localized_props):
  """Return keys present in localized_props but absent from base_props."""
  return sorted(set(localized_props.keys()) - set(base_props.keys()))

class TestPropsEscaped(unittest.TestCase):

  def test_latin1_decoding(self):
    # basic assumptions
    ascii_list= [97, 98, 99, 100, 101]
    self.assertEqual(ascii_list, [ord(ch) for ch in 'abcde'])
    byte_arr = bytearray(ascii_list)
    self.assertEqual(ascii_list, [int(int_item) for int_item in byte_arr])

    # decode iso-8859-1 with high-bit character: example from https://en.wikipedia.org/wiki/Mojibake
    iso_8859_1_list = [110, 0xE5]  # 'n', small letter A with ring above
    utf8_list = [110, 195, 165]    # same string encoded in utf-8
    try:
      self.assertEqual(utf8_list, [int(i) for i in bytearray(bytearray([110, 0xE5]).decode('iso-8859-1').encode('utf8'))], )
    except Exception as e:
      self.fail('Cannot convert from iso-8859-1 to utf8, but they should be built-in codecs: ' + str(e))

  def test_check_missing_escape(self):
     self.assertEqual(-1, check_missing_escape(""))
     self.assertEqual(-1, check_missing_escape("without-specials"))
     self.assertEqual(-1, check_missing_escape("aren't any positional args"))
     self.assertEqual(-1, check_missing_escape("'"))
     self.assertEqual(-1, check_missing_escape("''"))
     self.assertEqual(-1, check_missing_escape("' "))
     self.assertEqual(-1, check_missing_escape("'x"))
     self.assertEqual(-1, check_missing_escape("'' {0}"))
     self.assertEqual(-1, check_missing_escape(" '"))
     self.assertEqual(-1, check_missing_escape("x'"))
     self.assertEqual(-1, check_missing_escape("{0} ''"))
     self.assertEqual(-1, check_missing_escape("{"))
     self.assertEqual(-1, check_missing_escape("{ "))
     self.assertEqual(-1, check_missing_escape("{a"))
     self.assertEqual(-1, check_missing_escape("{0}"))
     self.assertEqual(-1, check_missing_escape("{0,number}"))
     self.assertEqual(-1, check_missing_escape("abc {0}"))
     self.assertEqual(-1, check_missing_escape("{0}'{"))  # test vs end-of-line
     self.assertEqual(-1, check_missing_escape("not an argument: {something}"))
     self.assertEqual(-1, check_missing_escape("aren't any args: {something}"))
     self.assertEqual(-1, check_missing_escape("argument{0} but without-specials"))
     self.assertEqual(-1, check_missing_escape("argument{0} it''s escaped"))
     self.assertEqual(3, check_missing_escape("isn't escaped but has {0}"))
     self.assertEqual(-1, check_missing_escape("argument{0} has escaped '{ brace"))
     self.assertEqual(8, check_missing_escape("{1} this { is missing escape"))
     self.assertEqual(8, check_missing_escape("{2} this {also} is missing escape"))

  def test_check_props_list_missing_escape(self):
    self.assertFalse(check_props_list_missing_escape([]))  # no errors in empty file

    comment_lines = ["# this is a comment", "  # also a comment"]
    blank_lines = ["", " ", "   ", "\t"]

    li = []
    li.extend(comment_lines)
    li.extend(blank_lines)
    self.assertFalse(check_props_list_missing_escape(li))  # no errors in empty file

    ok_lines = ["k=v", " k = v", " k=v", "k = v", "k =v", "k= v"]
    li.extend(ok_lines)
    self.assertFalse(check_props_list_missing_escape(li))

    res = check_props_list_missing_escape([" missing_equals and not a comment line"])
    self.assertEqual(1, len(res))
    self.assertEqual(res[0], (1, 0, "(Cannot parse this line)"))

    badline_1 = "some.prop = isn't escaped but has {0}"  # column index 3
    badline_2 = "x.prop={1} this { is missing escape"     # column index 8
    res = check_props_list_missing_escape([badline_1, badline_2])
    self.assertEqual(2, len(res))
    self.assertEqual(res[0], (1, 3, "some.prop"))
    self.assertEqual(res[1], (2, 8, "x.prop"))

  def test_message_arg_signature(self):
    self.assertEqual((set(), {}), message_arg_signature(""))
    self.assertEqual((set([0]), {}), message_arg_signature("Hello {0}"))
    self.assertEqual((set([0]), {}), message_arg_signature("{0,number} points"))
    self.assertEqual((set([0]), {}), message_arg_signature("{0,choice,0#none|1#one|1<{0,number}}"))
    self.assertEqual((set([0]), {0: "rsrcs"}), message_arg_signature("{0,rsrcs}"))
    self.assertEqual((set([0, 2]), {2: "list"}), message_arg_signature("{0}: {2,list}"))
    self.assertEqual((set([0]), {}), message_arg_signature("'{1}' literal and {0} real"))

  def test_check_props_placeholder_parity(self):
    base_props, parse_errors = parse_props_list([
      "plain = no args",
      "name = Hello {0}",
      "rsrc = Give {0,rsrcs}",
      "count = {0,number} points",
      "obsolete.base = still here"
    ])
    self.assertFalse(parse_errors)

    localized_props, parse_errors = parse_props_list([
      "plain = no args translated",
      "name = Hola",
      "rsrc = Da {0}",
      "count = {0,choice,0#none|1#one|1<{0,number}} puntos",
      "extra = obsolete"
    ])
    self.assertFalse(parse_errors)

    mismatches = check_props_placeholder_parity(base_props, localized_props)
    self.assertEqual(2, len(mismatches))
    self.assertEqual("name", mismatches[0][0])
    self.assertEqual("rsrc", mismatches[1][0])
    self.assertEqual(["extra"], check_props_extra_keys(base_props, localized_props))

  def test_parse_all_props_files(self):
    """Gather all properties files, parse each one, print results if not as expected.
    and *.properties should be under src/main/resources/**/
    """
    self.assertTrue(os.path.isdir(MAIN_RESOURCES_DIR),
      msg="Can't find " + MAIN_RESOURCES_DIR + " ; current directory is " + os.getcwd())

    all_prop_filenames = []
    for root, dirs, files in os.walk(MAIN_RESOURCES_DIR):
      for fname in files:
        if fname.lower().endswith(".properties"):
          all_prop_filenames.append(os.path.join(root, fname))
    self.assertTrue(len(all_prop_filenames),
      msg="Can't find *.properties under " + MAIN_RESOURCES_DIR + " ; current directory is " + os.getcwd())
    all_errors = {}
    for fname in all_prop_filenames:
      with io.open(fname, 'r', encoding='iso-8859-1') as f:
        file_errors = check_props_list_missing_escape(f.readlines())
        if file_errors:
          all_errors[fname] = file_errors
    if all_errors:
      self.fail("\n\nCharacter escape problems in properties files (line, char, key):\n" + repr(all_errors) + "\n\n")

  def test_localized_placeholder_parity(self):
    """Check localized bundles against their base bundle for keys they translate."""
    families = [
      os.path.join(STRINGS_DIR, "client", "data.properties"),
      os.path.join(STRINGS_DIR, "server", "toClient.properties")
    ]

    all_errors = {}
    for base_fname in families:
      with io.open(base_fname, 'r', encoding='iso-8859-1') as f:
        base_props, parse_errors = parse_props_list(f.readlines())
      if parse_errors:
        all_errors[base_fname] = {"parse": parse_errors}
        continue

      base_dir = os.path.dirname(base_fname)
      base_name = os.path.basename(base_fname)
      base_prefix = base_name[:-len(".properties")]
      for fname in sorted(os.listdir(base_dir)):
        if (not fname.endswith(".properties")) or (fname == base_name) or (not fname.startswith(base_prefix + "_")):
          continue

        localized_fname = os.path.join(base_dir, fname)
        with io.open(localized_fname, 'r', encoding='iso-8859-1') as f:
          localized_props, parse_errors = parse_props_list(f.readlines())
        if parse_errors:
          all_errors[localized_fname] = {"parse": parse_errors}
          continue

        extra_keys = check_props_extra_keys(base_props, localized_props)
        mismatches = check_props_placeholder_parity(base_props, localized_props)
        if extra_keys or mismatches:
          all_errors[localized_fname] = {
            "extra_keys": extra_keys,
            "placeholder_mismatches": mismatches
          }

    if all_errors:
      self.fail("\n\nLocalized properties do not match base placeholder/key requirements:\n" + repr(all_errors) + "\n\n")

if __name__ == '__main__':
    unittest.main()
