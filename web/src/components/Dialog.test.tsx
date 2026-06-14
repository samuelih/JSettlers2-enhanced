import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('keeps tab focus inside the modal', async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Outside</button>
        <Dialog open onClose={vi.fn()} title="Settings">
          <button type="button">First action</button>
          <button type="button">Second action</button>
        </Dialog>
      </>,
    );

    expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'First action' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Second action' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Second action' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Outside' })).not.toHaveFocus();
  });

  it('does not override autofocus inside the modal', () => {
    render(
      <Dialog open onClose={vi.fn()} title="New game">
        <label>
          Game name
          <input autoFocus />
        </label>
      </Dialog>,
    );

    expect(screen.getByRole('textbox', { name: 'Game name' })).toHaveFocus();
  });
});
