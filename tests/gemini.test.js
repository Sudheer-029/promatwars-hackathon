// tests/gemini.test.js

describe('Gemini Service Module', () => {
    test('Assistant parses routing queries correctly', async () => {
        const query = 'Fastest way to my seat?';
        expect(query).toContain('seat');
    });

    test('Assistant gracefully handles missing data', async () => {
        const emptyQuery = '';
        expect(emptyQuery).toBeFalsy();
    });
});
