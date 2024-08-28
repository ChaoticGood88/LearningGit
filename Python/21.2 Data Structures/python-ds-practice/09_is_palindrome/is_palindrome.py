def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    # Normalize the phrase by removing spaces and converting to lowercase
    normalized_phrase = ''.join(phrase.split()).lower()
    # Check if the normalized phrase is equal to its reverse
    return normalized_phrase == normalized_phrase[::-1]
