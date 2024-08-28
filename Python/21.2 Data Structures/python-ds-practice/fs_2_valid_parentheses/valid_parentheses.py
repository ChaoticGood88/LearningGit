def valid_parentheses(parens):
    """Are the parentheses validly balanced?

    Returns True if the parentheses are validly balanced, otherwise False.

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """
    
    balance = 0
    
    for char in parens:
        if char == '(':
            balance += 1
        elif char == ')':
            balance -= 1
