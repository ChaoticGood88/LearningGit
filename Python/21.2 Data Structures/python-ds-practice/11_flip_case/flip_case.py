def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'
    """
    # Create a translation table for swapping the case of the specified character
    translation_table = str.maketrans(
        to_swap + to_swap.upper(),
        to_swap.upper() + to_swap.lower()
    )
    
    # Use the translation table to swap cases
    return phrase.translate(translation_table)

