import math

class Activations:
    @staticmethod
    def sigmoid(x, *args):
        x = 1 / (1 + math.exp(-x))
        return x
    @staticmethod
    def dsigmoid(y, *args):
        y = y * (1 - y)
        return y
