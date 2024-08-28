def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    if not phrase:
        return phrase  # Return an empty string if the input is empty
    
    # Split the phrase into words
    words = phrase.split()
    
    # Capitalize the first word and keep the rest unchanged
    words[0] = words[0].capitalize()
    
    # Join the words back into a single string
    return ' '.join(words)
