def calculate(operation, a, b, make_int=False, message='The result is'):
    """Perform operation on a and b, possibly truncating & returning with a message.

    - operation: 'add', 'subtract', 'multiply', or 'divide'
    - a and b: values to operate on
    - make_int: (optional, defaults to False) if True, truncates to integer
    - message: (optional) message to use (if not provided, use 'The result is')

    Performs math operation (truncating if make_int), then returns as
    "[message] [result]"

        >>> calculate('add', 2.5, 4)
        'The result is 6.5'

        >>> calculate('subtract', 4, 1.5, make_int=True)
        'The result is 2'

        >>> calculate('multiply', 1.5, 2)
        'The result is 3.0'

        >>> calculate('divide', 10, 4, message='I got')
        'I got 2.5'

    If a valid operation isn't provided, return None.

        >>> calculate('foo', 2, 3)
        >>> calculate('divide', 10, 0)  # Optional handling for divide by zero
    """
    # Perform the appropriate operation
    if operation == 'add':
        result = a + b
    elif operation == 'subtract':
        result = a - b
    elif operation == 'multiply':
        result = a * b
    elif operation == 'divide':
        if b == 0:  # Optional: handle division by zero
            return None
        result = a / b
    else:
        return None  # Return None if operation is not recognized

    # Truncate result if make_int is True
    if make_int:
        result = int(result)

    # Return the result with the message
    return f"{message} {result}"

