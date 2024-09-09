# Tracing integration in Lighthouse
## Motivation

[Tracing framework](https://slog.rs/) is good at providing additional context to logs,especially in multi threaded async software like Lighthouse. It makes interpreting logs much easier and will help devs identify and fix bugs faster. 
## Project description
Currently lighthouse mostly uses [`slog`](https://slog.rs/) for logging (although in some parts it uses `tracing` in network stack).My project will be to migrate it all to [`tracing`](https://docs.rs/tracing/latest/tracing/)

## Specification
- We'll replace `slog` and `log` with `tracing` through-out their codebase
- Handle SSE logging with a tracing subscriber
- Replace [`sloggers`](https://github.com/sile/sloggers)(which is currently being used to emit logs into logfile) 

## Roadmap
Here's the estimated timeline for Lighthouse-Reth
- phase 1 (9 weeks): Migrate all crates which are currently using `slog` & `log` to `tracing`
- phase 2 (3 weeks): Handle SSE logging
- phase 3 (2 weeks): Replace sloggers
    


## Possible challenges

For last ~1.5 years I've been working in the smart-contract security research/auditing space & aside from doing some small contributions here and there I was mostly out of touch from coding anything major for a while,so it can be a bit challenging for me to work at a fast pace initially as I got very rusty.

## Goal of the project
By the end of fellowship,the goal is to 
- Get the [PR](https://github.com/sigp/lighthouse/pull/6339) for tracing integration merged in to Lighthouse


## Collaborators

### Fellows 

[Sayan](https://github.com/ThreeHrSleep/)

### Mentors
- [Eitan Seri-Levi](https://github.com/eserilev)
- [Mac Ladson](https://github.com/macladson)

## Resources

[list of resources that I am & will be using](https://hackmd.io/@threehrsleep/list-of-resources-for-my-epf-project)