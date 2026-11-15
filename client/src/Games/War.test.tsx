import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { War } from './War';

describe('War', () => {
    it('deals 26 cards each and plays a turn on Space', () => {
        render(<War />);
        expect(screen.getByText('Press Space Bar to play a turn')).toBeInTheDocument();
        expect(screen.getByText(/Total number of turns: 0/)).toBeInTheDocument();
        expect(screen.getAllByText('26')).toHaveLength(2 * 26);
        act(() => { document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' })); });
        expect(screen.queryByText(/Total number of turns: 0/)).toBeNull();
    });
});
