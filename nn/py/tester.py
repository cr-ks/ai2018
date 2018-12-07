import random
import nn as nn
NeuralNetwork = nn.NeuralNetwork

nn = NeuralNetwork(2,2,1)

training = [
    { 'inputs': [1,0], 'targets': [1] },
    { 'inputs': [0,1], 'targets': [1] },
    { 'inputs': [1,1], 'targets': [0] },
    { 'inputs': [0,0], 'targets': [0] },
]

for i in range(100):
    data = training[random.randint(0, 3)]
    nn.train(data['inputs'],data['targets'])

answer = nn.predict([1,0])
print(answer)
