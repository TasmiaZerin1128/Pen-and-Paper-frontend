import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    it('should have a headline', () => {
        render(<App />);
    })
});