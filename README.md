# Code Evaluator

#### Unstable Alpha Version, Use at your own risk.
[![Build Status](https://travis-ci.com/asr1191/code-evaluator.svg?branch=master)](https://travis-ci.com/asr1191/code-evaluator) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/bfb79aecc3cf4c0b943175ce360158b2)](https://www.codacy.com/app/asr1191/code-evaluator?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=asr1191/code-evaluator&amp;utm_campaign=Badge_Grade) ![Doge Badge](https://img.shields.io/badge/wows-much-brightgreen.svg) [![npm](https://img.shields.io/npm/dt/code-evaluator.svg)](https://www.npmjs.com/package/code-evaluator)

Reads, compiles, runs source code in supported languages, and gives you an output.

### Supported Languages

-   **python2** (python2)
-   **python3** (python3)
-   **C** (gcc)
-   **C++** (g++)

## How to Install

`npm install code-evaluator`

## How to Use

See example: [express-example.js](./examples/express-example.js "Example code to use code-evaluator in an Express application")

* * *

## Error Codes

| Error.name        | Description                                  |
| ----------------- | -------------------------------------------- |
| CODEDIR_NOEXIST   | Codefile storage directory does not exists.  |
| CODEFILE_NOWRITE  | Unable to write codefile.                    |
| INPUTDIR_NOEXIST  | Inputfile storage directory does not exists. |
| INPUTFILE_NOWRITE | Unable to write inputfile.                   |
| COMPILATION_ERROR | Unable to compile from codefile              |
| CODERUN_ERROR     | Unable to run code or binary                 |

* * *

## License

[GPL 3.0](./LICENSE)
