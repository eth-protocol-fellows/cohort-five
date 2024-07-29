# Op code implementations, tests, code analysis and statistics for Nethermind's IL-EVM.

## Motivations

There are many intrinsic and extrinsic motivations to work on an EVM optimization project. 

1. **Personal Motivations**: I want to learn more about optimization and lower-level programming in general, and having a project to work on helps me achieve that goal.
2. **Technical Motivations**: Enhancing the performance of the EVM through optimization can result in quicker transaction processing, which in turn enhances the scalability of Layer 1 by increasing its capacity to handle a higher number of transactions per second.
3. **Environmental Motivations**: Optimizations result in improved resource utilization, meaning that resources are used more efficiently for a given task. Alternatively, optimizations reduce the amount of resources required to perform the same task. This results in a more environmentally friendly node. Optimizing the EVM, which is a resource-intensive component of the node, would significantly improve the efficiency of hardware utilization.  
4. **Economic motivations**: The operational cost of the node can be reduced through optimisation, which can potentially lead to lowering the gas price 

## Project description

The objective of my project is to align with the immediate goals of IL-EVM, an ongoing project  by Nethermind. IL-EVM seeks to enhance the efficiency of the EVM by dynamically converting EVM code segments of contracts that exceed a specific threshold into the intermediate language of .NET. Furthermore, it employs the .NET stack rather than the EVM stack for executing EVM operations, and the IL code generated during runtime undergoes just-in-time compilation and subsequent real-time optimization into native machine code by the .NET runtime. The project incorporates a code analyzer that can inspect the code for instances of a specific pattern and takes a call on when a smart contract should be analyzed for a pattern and when it should be compiled. These are some slides from the [project presentation](https://docs.google.com/presentation/d/1gVP9EEzv33W_z6ZwPG1yyHqEvdBu2ZozC_ZsAsRfmuA/edit#slide=id.g2156ae2f48f_19_20) that outline the existing components of IL-EVM and potential optimization ideas.

My project tasks in order of priority can be broken down into the following:

1. Implement LOG0, LOG1, LOG2, LOG3, LOG4 opcodes for the IL-EVM compiler: 
    - This involves learning the underlying IL code generation library, Sigil. 
    - Writing a working implementation.
    - Optimise the implementation
2. Increase Test Coverage :
   - Write tests, which verify the implementation of all the OpCodes that are compiled by IL-EVM
   - Debug and fix implementation bugs if found
   - Other tests TBD
3. Generate statistics for which smart contracts are being executed and how frequently.
   - Add code that helps us query the node for the statistics.  
   - Sync the node and get the statistics
4. Generate statistics for groups of 2-7 op code patterns 
     - Decide on a temporal pattern mining algorithm or strategy 
     - Augment the code analyzer with the ability to generate statistics for frequent 2,3,4,5,6 & 7 Op Code patterns that are being executed  
     - Optimise the implementation 
5. Implementation for groups of 2-7 op code patterns 
   -  Select the most frequently called 2-7 op code patterns from the earlier task and create  specific implementations for them
   -  Optimise the specific implementations. 
6. Benchmarking (optional: if other tasks are completed)


## Roadmap

week 6-8    — Implement the 5 LOG0 - LOG4 instructions
week 8-10   — Start working on tests that verify the IL-EVM implementation of the op codes | Wrap up LOG Implementation
week 10-12  — Start working on smart contract execution stats | Increase test coverage 
week 12-14  — Start working on op code stats | Smart contract stats,  node sync & get stats | Test coverage
week 14-16  — 2-7 Op code stats | 2-7 Op code implementations | Test coverage 
week 16-18  — 2-7 Op code implementations | 2-7 Op code stats | Test coverage 
week 18-20  — Wrap Up pending tasks | Benchmarking 
week 20-21+ — Devcon EPF project presentation | Benchmarking | Wrap up pending tasks

## Possible challenges

1. Lack of dotnet knowledge and c# skills. 
2. First project dealing with optimization. 

## Goal of the project

Completing most of the tasks outlined above and making good progress on any left over tasks.

## Collaborators

### Mentors

* Szymon Kulec ([@sooletz](https://github.com/Scooletz))
* Ayman Bouchareb ([@Demuirgos](https://github.com/Demuirgos))

## Resources

[IL-EVM Issues](https://github.com/NethermindEth/IL-EVM/issues)
[Feature : IL-Evm Optimization](https://github.com/NethermindEth/nethermind/pull/6985)

