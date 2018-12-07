// ----------------------------------------------------------------------------------//
// Matrix Library for use with Neural Networks
// - from Daniel Shiffman's youtube playlist (10)
// AI Samples (( v0.1 ))
// CRKS | September 1, 2018
// ----------------------------------------------------------------------------------//

// matrix definition
class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

     for (let i = 0; i < this.rows; i++) {
       this.data[i] = [];
       for (let j = 0; j < this.cols; j++) {
         this.data[i][j] = 0;
       }
     }
  }

  static fromArray(array) {
    let matrix = new Matrix(array.length, 1);
    for (let i = 0; i < array.length; i++) {
      matrix.data[i][0] = array[i];
    }
    return matrix;
  }

  toArray() {
    let array = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        array.push(this.data[i][j]);
      }
    }
    return array;
  }

  static subtract(a, b) {
    let result = new Matrix(a.rows, a.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }

  static transpose(a) {
    let result = new Matrix(a.cols, a.rows);
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        result.data[j][i] = a.data[i][j];
      }
    }
    return result;
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) {
      console.log('Columns of A must match rows of B!')
      return undefined;
    }
    let result = new Matrix(a.rows, b.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }

  randomize(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  map(func) {
    // apply a function to every value in the matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val);
      }
    }
    return this;
  }

  static map(m, func) {
    // apply a function to every value in the matrix
    let result = new Matrix(m.rows, m.cols);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        let val = m.data[i][j];
        result.data[i][j] = func(val);
      }
    }
    return result;
  }

  add(n) {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    }
  }

  multiply(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }

      // hadamard product
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }
    } else {
      // Scalar product
      return this.map(e => e * n);
    }
  }

  print() {
    for (let i = 0; i < this.rows; i++) {
      console.log(this.data[i]);
    }
  }
}

test = new Matrix(4,4);
test.randomize();
test.print();
