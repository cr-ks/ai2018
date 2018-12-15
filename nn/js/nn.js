// ----------------------------------------------------------------------------------//
// Basic Nueral Network Library
// - from Daniel Shiffman's youtube playlist (10)
// AI Samples (( v0.1 ))
// CRKS | September 1, 2018 | Updated: October 28, 2018
// ----------------------------------------------------------------------------------//

// Step One: initialize the network with a dimensions array
// Step Two: Pass input to feedFoward function

class NeuralNetwork {
  constructor(numberInputNodes, numberHiddenNodes, numberOutputNodes) {
    this.numberInputNodes = numberInputNodes;
    this.numberHiddenNodes = numberHiddenNodes;
    this.numberOutputNodes = numberOutputNodes;
    this.learningRate = 0.1;

    this.weightsHidden = new Matrix( this.numberHiddenNodes, this.numberInputNodes );
    this.weightsOutput = new Matrix( this.numberOutputNodes, this.numberHiddenNodes );
    this.weightsHidden.randomize();
    this.weightsOutput.randomize();

    this.biasHidden = new Matrix( this.numberHiddenNodes, 1 );
    this.biasOutput = new Matrix( this.numberOutputNodes, 1 );
    this.biasHidden.randomize();
    this.biasOutput.randomize();

    this.activations = {
      sigmoid: x => 1 / (1 + Math.exp(-x)),
      dsigmoid: y => y * (1 - y)
    }
  }

  feedForward(inputArray) {
    // 1 - convert inputs and target arrays to matrices
    let inputs = Matrix.fromArray(inputArray);

    // --- BEGIN FEED FORWARD ---

    // 2.a - feed foward layer one [sigmoid(weights * inputs + bias)]
    let outputsHidden = Matrix.multiply(this.weightsHidden, inputs);
    outputsHidden.add(this.biasHidden);
    outputsHidden.map(this.activations.sigmoid);

    // 2.b - feed foward layer two [sigmoid(weights * hidden layer outputs + bias)]
    let outputs = Matrix.multiply(this.weightsOutput, outputsHidden);
    outputs.add(this.biasOutput);
    outputs.map(this.activations.sigmoid);

    return outputs.toArray();

  }

  train(inputArray, targetArray) {
    // 1 - convert inputs and target arrays to matrices
    let inputs = Matrix.fromArray(inputArray);
    let targets = Matrix.fromArray(targetArray);

    // --- BEGIN FEED FORWARD ---

    // 2.a - feed foward layer one [sigmoid(weights * inputs + bias)]
    let outputsHidden = Matrix.multiply(this.weightsHidden, inputs);
    outputsHidden.add(this.biasHidden);
    outputsHidden.map(this.activations.sigmoid);

    // 2.b - feed foward layer two [sigmoid(weights * hidden layer outputs + bias)]
    let outputs = Matrix.multiply(this.weightsOutput, outputsHidden);
    outputs.add(this.biasOutput);
    outputs.map(this.activations.sigmoid);

    // --- BEGIN BACK PROPEGATION ---

    // 3 - calculate differences of errors for outputs
    let outputErrors = Matrix.subtract(targets, outputs);

    // 4 - CALCULATE GRADIENT (outputs layer)
    // change (△) in output weights using : [lr * E * ( O * ( 1 - O ) ) • H] :: ( O * ( 1 - O ) ) = derivative of sigmoid
    // ie: learning rate * error of output * derivative of output (how does the output change relative to the errors)
    let outputGradients = Matrix.map(outputs, this.activations.dsigmoid); // derivative of sigmoid (outputGradients is a single column vector)
    outputGradients.multiply(outputErrors); // * E (vector/matrix multiplication, element-wise)
    outputGradients.multiply(this.learningRate); // * lr (scalar multiplication)

    // 5 - CALCULATE DELTAS
    // multiply by transposed inputsHidden (inputs from hidden -> output layer, single row vector)
    let outputsHiddenT = Matrix.transpose(outputsHidden);
    let weightsOutputDeltas = Matrix.multiply(outputGradients, outputsHiddenT); // gradient column vector * transposed hidden layer outputs row vector

    // 6.a - adjust the weights by computed deltas (hidden -> output)
    this.weightsOutput.add(weightsOutputDeltas);
    // 6.b - adjust the biases by its deltas (which is just the gradients)
    this.biasOutput.add(outputGradients);

    // 7 - calculate hidden layer errors matrix (same as step 3) ** ------------- TRY TO FIND THIS, NOT QUITE SURE HOW THIS WORKS, back prop?
    let weightsOutputT = Matrix.transpose(this.weightsOutput); // using changed output weights
    let hiddenErrors = Matrix.multiply(weightsOutputT, outputErrors);

    // 8 - CALC GRADIENT (hidden layer)
    let hiddenGradients = Matrix.map(outputsHidden, this.activations.dsigmoid); // mapboth in python
    hiddenGradients.multiply(hiddenErrors);
    hiddenGradients.multiply(this.learningRate);

    // 9 - CALC DELTAS (input -> hidden layer)
    let inputsT = Matrix.transpose(inputs);
    let weightsHiddenDeltas = Matrix.multiply(hiddenGradients, inputsT); // gradients * transposed inputs

    // 10.a - adjust the weights by computed deltas (input -> hidden) ... see step 6
    this.weightsHidden.add(weightsHiddenDeltas);
    // 10.b - adjust the biases by deltas (gradients)
    this.biasHidden.add(hiddenGradients);

    // inputs.print();
    // targets.print();
    // outputs.print();
    // outputErrors.print();
  }


}

// sample XOR data set
const training = [
  { inputs: [1,0], targets: [1] },
  { inputs: [0,1], targets: [1] },
  { inputs: [1,1], targets: [0] },
  { inputs: [0,0], targets: [0] }
]

let nn = new NeuralNetwork(2, 2, 1);
for (let i = 0; i < 100000; i++) {
  let data = training[rand(0, training.length - 1)]
  nn.train(data.inputs, data.targets);
}

console.log(nn.feedForward([1,0]));
console.log(nn.feedForward([0,1]));
console.log(nn.feedForward([1,1]));
console.log(nn.feedForward([0,0]));

// let test = new Matrix(2, 2);
// test.map(x => x + 1);
// test.print();
// test.map(y => y * 2);
// test.print();

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }
