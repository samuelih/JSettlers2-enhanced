/**
 * Sammys-Settlers - An online multiplayer version of the game Settlers of Catan
 * Portions of this file Copyright (C) 2026 Jeremy D Monin <jeremy@nand.net>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The maintainer of this program can be reached at jsettlers@nand.net
 **/
package soc.client;

import soc.util.SOCStringManager;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.WindowConstants;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;

/**
 * Non-modal event timeline for one {@link SOCPlayerInterface}.
 * Shows recent game-action text separately from chat, for easier scanning during play,
 * debugging, teaching, and manual replay review.
 *
 * @author Jeremy D Monin &lt;jeremy@nand.net&gt;
 * @since 2.7.00
 */
@SuppressWarnings("serial")
/*package*/ class SOCGameEventTimelineFrame extends JFrame
{
    /**
     * i18n text strings.
     * @since 2.7.00
     */
    private static final SOCStringManager strings = SOCStringManager.getClientManager();

    /**
     * Owning player interface.
     * @since 2.7.00
     */
    private final SOCPlayerInterface pi;

    /**
     * Read-only timeline text area.
     * @since 2.7.00
     */
    private final JTextArea eventsText;

    /**
     * Full timeline lines shown in {@link #eventsText}, excluding the empty-message placeholder.
     * @since 2.7.00
     */
    private final List<String> allEventLines = new ArrayList<String>();

    /**
     * Search text field for selecting matching timeline text.
     * @since 2.7.00
     */
    private final JTextField findText;

    /**
     * Match count or no-match status for {@link #findText}.
     * @since 2.7.00
     */
    private final JLabel findStatus;

    /**
     * If selected, append and snapshot updates scroll to the latest event when search text is empty.
     * @since 2.7.00
     */
    private final JCheckBox autoScrollBox;

    /**
     * Create a timeline frame for a game interface.
     * @param pi  Owning player interface
     * @throws IllegalArgumentException if {@code pi} is null
     * @since 2.7.00
     */
    SOCGameEventTimelineFrame(final SOCPlayerInterface pi)
        throws IllegalArgumentException
    {
        super();

        if (pi == null)
            throw new IllegalArgumentException("pi");

        this.pi = pi;
        updateGameTitle(pi.getGame().getName());
        setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
        setLocationByPlatform(true);

        eventsText = new JTextArea(24, 84);
        eventsText.setEditable(false);
        eventsText.setLineWrap(true);
        eventsText.setWrapStyleWord(true);
        eventsText.setFont(new Font("SansSerif", Font.PLAIN, 11 * pi.displayScale));
        if (! SwingMainDisplay.isOSColorHighContrast())
        {
            eventsText.setBackground(Color.WHITE);
            eventsText.setForeground(Color.BLACK);
        }

        final JPanel searchPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        searchPanel.add(new JLabel(strings.get("interface.timeline.find")));  // "Find:"
        findText = new JTextField(18);
        searchPanel.add(findText);

        final JButton previousButton = new JButton(strings.get("interface.timeline.previous"));  // "Previous"
        final JButton nextButton = new JButton(strings.get("interface.timeline.next"));  // "Next"
        previousButton.addActionListener(new ActionListener()
        {
            public void actionPerformed(ActionEvent ae)
            {
                findNextMatch(false);
            }
        });
        nextButton.addActionListener(new ActionListener()
        {
            public void actionPerformed(ActionEvent ae)
            {
                findNextMatch(true);
            }
        });
        searchPanel.add(previousButton);
        searchPanel.add(nextButton);

        findStatus = new JLabel(" ");
        searchPanel.add(findStatus);

        final JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        autoScrollBox = new JCheckBox(strings.get("interface.timeline.autoscroll"));  // "Auto-scroll"
        autoScrollBox.setSelected(true);
        final JButton latestButton = new JButton(strings.get("interface.timeline.latest"));  // "Latest"
        final JButton copyButton = new JButton(strings.get("interface.timeline.copy_all"));  // "Copy All"
        final JButton closeButton = new JButton(strings.get("base.close"));  // "Close"

        latestButton.addActionListener(new ActionListener()
        {
            public void actionPerformed(ActionEvent ae)
            {
                autoScrollBox.setSelected(true);
                scrollToLatest();
            }
        });
        copyButton.addActionListener(new ActionListener()
        {
            public void actionPerformed(ActionEvent ae)
            {
                copyAllEvents();
            }
        });
        closeButton.addActionListener(new ActionListener()
        {
            public void actionPerformed(ActionEvent ae)
            {
                dispose();
            }
        });

        buttonPanel.add(autoScrollBox);
        buttonPanel.add(latestButton);
        buttonPanel.add(copyButton);
        buttonPanel.add(closeButton);

        findText.getDocument().addDocumentListener(new DocumentListener()
        {
            public void insertUpdate(DocumentEvent e)  { searchTextChanged(); }
            public void removeUpdate(DocumentEvent e)  { searchTextChanged(); }
            public void changedUpdate(DocumentEvent e) { searchTextChanged(); }
        });

        getContentPane().setLayout(new BorderLayout(6, 6));
        getContentPane().add(searchPanel, BorderLayout.NORTH);
        getContentPane().add(new JScrollPane(eventsText), BorderLayout.CENTER);
        getContentPane().add(buttonPanel, BorderLayout.SOUTH);

        addWindowListener(new WindowAdapter()
        {
            @Override
            public void windowClosed(WindowEvent e)
            {
                pi.eventTimelineWindowClosed(SOCGameEventTimelineFrame.this);
            }
        });

        pack();
    }

    /**
     * Update title text when this frame is reused after a board reset.
     * @param gameName  Current game name
     * @since 2.7.00
     */
    void updateGameTitle(final String gameName)
    {
        setTitle(strings.get("interface.timeline.title", gameName));
    }

    /**
     * Replace all event text from a snapshot of the owning player interface's timeline.
     * @param lines  Timeline lines; may be empty but not null
     * @since 2.7.00
     */
    void setEvents(final List<String> lines)
    {
        final List<String> linesSnapshot = new ArrayList<String>(lines);

        if (! SwingUtilities.isEventDispatchThread())
        {
            SwingUtilities.invokeLater(new Runnable()
            {
                public void run()
                {
                    setEvents(linesSnapshot);
                }
            });
            return;  // <--- Early return: update queued on AWT event thread ---
        }

        final StringBuilder sb = new StringBuilder();
        allEventLines.clear();
        allEventLines.addAll(linesSnapshot);
        trimEventLinesToMax();
        for (String line : allEventLines)
            sb.append(line).append('\n');

        if (sb.length() == 0)
            eventsText.setText(strings.get("interface.timeline.empty"));
        else
            eventsText.setText(sb.toString());

        searchTextChanged();
        if (shouldAutoScroll())
            scrollToLatest();
    }

    /**
     * Append one timeline line.
     * @param line  Event text line
     * @since 2.7.00
     */
    void appendEvent(final String line)
    {
        if (! SwingUtilities.isEventDispatchThread())
        {
            SwingUtilities.invokeLater(new Runnable()
            {
                public void run()
                {
                    appendEvent(line);
                }
            });
            return;  // <--- Early return: update queued on AWT event thread ---
        }

        allEventLines.add(line);
        if (trimEventLinesToMax())
        {
            setEvents(allEventLines);
            return;  // <--- Early return: contents rebuilt after trimming old events ---
        }

        if (allEventLines.size() == 1)
            eventsText.setText("");

        eventsText.append(line + "\n");
        updateFindStatus();
        if (shouldAutoScroll())
            scrollToLatest();
    }

    /**
     * Copy the current timeline text to the system clipboard.
     * @since 2.7.00
     */
    private void copyAllEvents()
    {
        final StringBuilder sb = new StringBuilder();
        for (String line : allEventLines)
            sb.append(line).append('\n');

        final String txt = sb.toString();
        if (txt.length() == 0)
            return;

        try
        {
            final StringSelection data = new StringSelection(txt);
            final Clipboard cb = Toolkit.getDefaultToolkit().getSystemClipboard();
            if (cb != null)
                cb.setContents(data, data);
        } catch (Exception e) {}  // security, or clipboard unavailable
    }

    /**
     * Trim stored event lines to the same cap as the owning game interface.
     * @return True if any lines were removed
     * @since 2.7.00
     */
    private boolean trimEventLinesToMax()
    {
        boolean didTrim = false;
        while (allEventLines.size() > SOCPlayerInterface.EVENT_TIMELINE_MAX_LINES)
        {
            allEventLines.remove(0);
            didTrim = true;
        }

        return didTrim;
    }

    /**
     * If search text changed, update match status and select the first match if possible.
     * @since 2.7.00
     */
    private void searchTextChanged()
    {
        updateFindStatus();

        if (getSearchText().length() > 0)
            selectMatch(0, true);
        else if (autoScrollBox.isSelected())
            scrollToLatest();
    }

    /**
     * Update {@link #findStatus} from the current search text.
     * @since 2.7.00
     */
    private void updateFindStatus()
    {
        final String needle = getSearchText();
        if (needle.length() == 0)
        {
            findStatus.setText(" ");
            return;  // <--- Early return: no active search ---
        }

        final int matches = countMatches(needle);
        findStatus.setText
            ((matches == 0)
             ? strings.get("interface.timeline.find.none")
             : strings.get("interface.timeline.find.matches", matches));
    }

    /**
     * Select the next or previous search match, wrapping when needed.
     * @param forward  True to search forward, false for previous
     * @since 2.7.00
     */
    private void findNextMatch(final boolean forward)
    {
        final String needle = getSearchText();
        if (needle.length() == 0)
            return;

        final int start =
            (forward)
            ? Math.max(eventsText.getSelectionEnd(), eventsText.getCaretPosition())
            : Math.min(eventsText.getSelectionStart(), eventsText.getCaretPosition()) - 1;
        selectMatch(start, forward);
    }

    /**
     * Select a search match starting near a text offset.
     * @param start  Text offset to begin searching from
     * @param forward  True to search forward, false for previous
     * @since 2.7.00
     */
    private void selectMatch(final int start, final boolean forward)
    {
        final String needle = getSearchText();
        if (needle.length() == 0)
            return;

        final String haystack = getSearchableText();
        final String haystackLower = haystack.toLowerCase(Locale.ROOT);
        int match;
        if (forward)
        {
            match = haystackLower.indexOf(needle, Math.max(0, start));
            if (match == -1)
                match = haystackLower.indexOf(needle, 0);
        } else {
            match = haystackLower.lastIndexOf(needle, Math.min(start, haystackLower.length() - 1));
            if (match == -1)
                match = haystackLower.lastIndexOf(needle);
        }

        if (match == -1)
            return;

        eventsText.requestFocusInWindow();
        eventsText.select(match, match + needle.length());
    }

    /**
     * Count case-insensitive matches of the current search text.
     * @param needle  Lowercase search text, not empty
     * @return Number of matches
     * @since 2.7.00
     */
    private int countMatches(final String needle)
    {
        final String haystack = getSearchableText().toLowerCase(Locale.ROOT);
        int count = 0, idx = 0;
        while (true)
        {
            idx = haystack.indexOf(needle, idx);
            if (idx == -1)
                break;

            ++count;
            idx += needle.length();
        }

        return count;
    }

    /**
     * Get lowercase search text.
     * @return Current search text, trimmed and lowercase
     * @since 2.7.00
     */
    private String getSearchText()
    {
        final String txt = findText.getText();
        return ((txt != null) ? txt.trim() : "").toLowerCase(Locale.ROOT);
    }

    /**
     * Get event text to search, excluding the empty-message placeholder.
     * @return Searchable event text
     * @since 2.7.00
     */
    private String getSearchableText()
    {
        if (allEventLines.isEmpty())
            return "";

        return eventsText.getText();
    }

    /**
     * Should the visible text area move to the latest event after an update?
     * @return True if auto-scroll is selected and no search text is active
     * @since 2.7.00
     */
    private boolean shouldAutoScroll()
    {
        return autoScrollBox.isSelected() && (getSearchText().length() == 0);
    }

    /**
     * Scroll to the latest visible timeline event.
     * @since 2.7.00
     */
    private void scrollToLatest()
    {
        eventsText.setCaretPosition(eventsText.getDocument().getLength());
    }
}
