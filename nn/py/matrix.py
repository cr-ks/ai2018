# ----------------------------------------------------------------------------------#
# Matrix Library for use with Neural Networks
# AI Samples (( v0.1 ))
# CRKS | September 4, 2018
# ----------------------------------------------------------------------------------#
import random

# matrix definition
class Matrix:
    # initialize the matrix
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.data = [[0 for i in range(cols)] for j in range(rows)]

    # print - prints square matrix to console
    def Print(self):
        for i in range(self.rows):
            print(self.data[i])

    # map - used to apply general functions to each matrix value
    def map(self,function):
        for i in range(self.rows):
            for j in range(self.cols):
                value = self.data[i][j]
                self.data[i][j] = function(value, i, j)

    # randomize - randomly sets all matrix values between -1 and 1
    def randomize(self):
        def rand(x, i, j):
            x = random.uniform(-1,1)
            return x
        self.map(rand)

    # add - if given a single digit, applies scalar addition to matrix
    #     - if given a matrix, applies element-wise addition
    def add(self,n):
        if isinstance(n, Matrix):
            if n.cols != self.cols or n.rows != self.rows:
                print('ERROR: Matrices must be of the same dimensions.')
            else:
                def add(x, i, j):
                    x = x + n.data[i][j]
                    return x
                self.map(add)
        else:
            def add(x, i, j):
                x = x + n
                return x
            self.map(add)

    # scale / multiply - takes the scalar product or hadmard depending on input
    def scale(self,n):
        if isinstance(n, Matrix):
            if n.cols != self.cols or n.rows != self.rows:
                print('ERROR: Matrices must be of the same dimensions.')
            else:
                def scale(x, i, j): # hadamard product
                    x = x * n.data[i][j]
                    return x
                self.map(scale)
        else:
            def scale(x, i, j): # scalar multiplication
                x = x * n
                return x
            self.map(scale)

    # subtract - STATIC METHOD
    @staticmethod
    def subtract(a,b):
        result = Matrix(a.rows, a.cols)
        if isinstance(b, Matrix):
            if a.cols != b.cols or a.rows != b.rows:
                print('ERROR: Matrices must be of the same dimensions.')
            else:
                def subtract(x, i, j):
                    x = x - b.data[i][j]
                    return x
                result.map(subtract)
        else:
            result = Matrix(a.rows, a.cols)
            def subtract(x, i, j):
                x = x - b
                return x
            result.map(subtract)
        return result

    # multiply - matrix dot? multiplication on inputs, outputs new matrix
    @staticmethod
    def multiply(a,b):
        if a.cols != b.rows:
            print('ERROR: Matrices must of the correct dimensions.')
        else:
            result = Matrix(a.rows,b.cols)
            def multiply(x,i,j):
                sum = 0
                for k in range(a.cols):
                    sum = sum + (a.data[i][k] * b.data[k][j])
                return sum
            result.map(multiply)
            return result

    # mapboth - static mapping method
    @staticmethod
    def mapboth(matrix,function):
        result = Matrix(matrix.rows, matrix.cols)
        def mapboth(x, i, j):
            x = function(matrix.data[i][j], i, j)
            return x
        result.map(mapboth)
        return result

    # transpose  matrix
    @staticmethod
    def transpose(matrix):
        result = Matrix(matrix.cols, matrix.rows)
        def transpose(x, i, j):
            x = matrix.data[j][i]
            return x
        result.map(transpose)
        return result

    @staticmethod
    def fromArray(array):
        result = Matrix(len(array), 1)
        for i in range(len(array)):
            result.data[i][0] = array[i]
        return result

    @staticmethod
    def toArray(matrix):
        result = []
        for i in range(matrix.rows):
            for j in range(matrix.cols):
                result.append(matrix.data[i][j])
        return result
