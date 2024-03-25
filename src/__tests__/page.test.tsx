import { expect, describe, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Page from '../app/page'
import userEvent from '@testing-library/user-event'
describe('Home component', () => {
    it('renders correctly', () => {
       render(<Page />);
        expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
        expect(screen.getByAltText('Vercel Logo')).toHaveAttribute('src', '/vercel.svg');
        expect(screen.getByText(/Docs/i)).toBeInTheDocument();
    });

    it('renders images correctly', () => {
       render(<Page />);
        const nextLogo = screen.getByAltText('Next.js Logo');

        expect(nextLogo).toHaveAttribute('src', '/next.svg');
        expect(nextLogo).toHaveAttribute('height', '37');
    });

    it('handles click events', () => {
        const user = userEvent.setup()
        render(<Page />);
        const learnLink = screen.getByRole('link', { name: /Learn/i });

        user.click(learnLink);
    });
});