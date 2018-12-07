import activations as activationLib
Activations = activationLib.Activations
import matrix as matrixLib
Matrix = matrixLib.Matrix

class NeuralNetwork:
    # initialize the network
    def __init__(self, numberInputNodes, numberHiddenNodes, numberOutputNodes):
        self.numberInputNodes = numberInputNodes
        self.numberHiddenNodes = numberHiddenNodes
        self.numberOutputNodes = numberOutputNodes
        self.weightsHidden = Matrix( self.numberHiddenNodes, self.numberInputNodes )
        self.weightsOutput = Matrix( self.numberOutputNodes, self.numberHiddenNodes )
        self.weightsHidden.randomize()
        self.weightsOutput.randomize()
        self.biasHidden = Matrix( self.numberHiddenNodes, 1 )
        self.biasOutput = Matrix( self.numberOutputNodes, 1 )
        self.biasHidden.randomize()
        self.biasOutput.randomize()
        self.learningRate = 0.1

    def setLearningRate(rate):
        self.learningRate = rate

    def train(self, inputArray, targetArray):
        #1 - convert inputs and target arrays to matrices
        inputs = Matrix.fromArray(inputArray)
        targets = Matrix.fromArray(targetArray)

        # --- BEGIN FEED FORWARD ---
        # 2.a - feed foward layer one [sigmoid(weights * inputs + bias)]
        outputsHidden = Matrix.multiply(self.weightsHidden, inputs)
        outputsHidden.add(self.biasHidden)
        outputsHidden.map(Activations.sigmoid)

        # 2.b - feed foward layer two [sigmoid(weights * hidden layer outputs + bias)]
        outputs = Matrix.multiply(self.weightsOutput, outputsHidden)
        outputs.add(self.biasOutput)
        outputs.map(Activations.sigmoid)

        # --- BEGIN BACK PROPEGATION ---
        # 3 - calculate differences of errors for outputs
        outputErrors = Matrix.subtract(targets, outputs)

        # 4 - CALCULATE GRADIENT (outputs layer)
        # ie: learning rate * error of output * derivative of output (how does the output change relative to the errors)
        outputGradients = Matrix.mapboth(outputs, Activations.dsigmoid) # derivative of sigmoid (outputGradients is a single column vector)
        outputGradients.scale(outputErrors) # * E (vector/matrix multiplication, element-wise)
        outputGradients.scale(self.learningRate) # * lr (scalar multiplication)

        # 5 - CALCULATE DELTAS
        # multiply by transposed inputsHidden (inputs from hidden -> output layer, single row vector)
        outputsHiddenT = Matrix.transpose(outputsHidden)
        weightsOutputDeltas = Matrix.multiply(outputGradients, outputsHiddenT) # gradient column vector * transposed hidden layer outputs row vector

        # 6.a - adjust the weights by computed deltas (hidden -> output)
        self.weightsOutput.add(weightsOutputDeltas)
        # 6.b - adjust the biases by its deltas (which is just the gradients)
        self.biasOutput.add(outputGradients)

        # 7 - calculate hidden layer errors matrix (same as step 3) ** ------------- TRY TO FIND THIS, NOT QUITE SURE HOW THIS WORKS, back prop?
        weightsOutputT = Matrix.transpose(self.weightsOutput) # using changed output weights
        hiddenErrors = Matrix.multiply(weightsOutputT, outputErrors)

        # 8 - CALC GRADIENT (hidden layer)
        hiddenGradients = Matrix.mapboth(outputsHidden, Activations.dsigmoid) # mapboth in python
        hiddenGradients.scale(hiddenErrors)
        hiddenGradients.scale(self.learningRate)

        # 9 - CALC DELTAS (input -> hidden layer)
        inputsT = Matrix.transpose(inputs)
        weightsHiddenDeltas = Matrix.multiply(hiddenGradients, inputsT) # gradients * transposed inputs

        # 10.a - adjust the weights by computed deltas (input -> hidden) ... see step 6
        self.weightsHidden.add(weightsHiddenDeltas)
        # 10.b - adjust the biases by deltas (gradients)
        self.biasHidden.add(hiddenGradients)

        self.weightsOutput.Print()

        # inputs.Print()
        # targets.Print()
        # outputs.Print()
        # outputErrors.Print()

    def predict(self, inputArray):
        # 1 - convert inputs and target arrays to matrices
        inputs = Matrix.fromArray(inputArray)

        # --- BEGIN FEED FORWARD ---
        # 2.a - feed foward layer one [sigmoid(weights * inputs + bias)]
        outputsHidden = Matrix.multiply(self.weightsHidden, inputs)
        outputsHidden.add(self.biasHidden)
        outputsHidden.map(Activations.sigmoid)

        # 2.b - feed foward layer two [sigmoid(weights * hidden layer outputs + bias)]
        outputs = Matrix.multiply(self.weightsOutput, outputsHidden)
        outputs.add(self.biasOutput)
        outputs.map(Activations.sigmoid)

        return Matrix.toArray(outputs)
