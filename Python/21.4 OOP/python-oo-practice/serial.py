class SerialGenerator:
    """Machine to create unique incrementing serial numbers."""
    
    def __init__(self, start):
        """Initialize the serial generator with a start value."""
        self.start = start
        self.current = start

    def generate(self):
        """Generate the next serial number in sequence."""
        serial_number = self.current
        self.current += 1
        return serial_number

    def reset(self):
        """Reset the serial number back to the original start value."""
        self.current = self.start


