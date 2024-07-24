# Direct(non-http) integration of Lighthouse-Reth & Tracing integration in Lighthouse
## Motivation
- Direct integration of Lighthouse-Reth : Through this we're aiming to get improved performance by eliminating JSON serialisation/deserialisation.Our goal would be to have Lighthouse still work with any EL client, while Lighthouse-Reth is just a convenient (and performant) option.
- Tracing integration in Lighthouse : Tracing is good at providing additional context to logs,especially in multi threaded async software like Lighthouse. It makes interpreting logs much easier and will help devs identify and fix bugs faster. 
## Project description
- Direct(non-HTTP) integration of lighthouse-reth: We'll be creating a single repo with Reth & Lighthouse imported in it,and to connect Lighthouse to Reth ,instead of using HTTP RPC ,we'll be using regular function calls.
- Tracing integration in lighthouse: Currently lighthouse mostly uses `slog` for logging (although in some parts it uses`tracing` in network stack).My project will be to migrate it all to `tracing`

## Specification
### lighthouse-reth
- We'll import Lighthouse & Reth in a single repo
    - The core services of both will be running on the same executor,the structure should be similar to [lighthouse/src/main.rs](https://github.com/sigp/lighthouse/blob/stable/lighthouse/src/main.rs)
- For connecting Lighthouse to Reth we'll replace HTTP RPC with regular function calls
    - To do this we'll be abstracting the `ExecutionLayer` backend in Lighthouse by using a trait & then implementing that trait inside lighthouse-reth for the direct backend
        - The trait should contain all the methods that are currently on [`lighthouse/beacon_node/execution_layer/src/engine_api/http.rs#L681-L1285`](https://github.com/sigp/lighthouse/blob/9e12c21f268c80a3f002ae0ca27477f9f512eb6f/beacon_node/execution_layer/src/engine_api/http.rs#L681-L1285)
     - In Lighthouse upstream we'll change the definition of Engine to something like:
```rust
    pub struct Engine<Backend: ExecutionBackend = HttpJsonRpc> {
        pub api: Backend,
        payload_id_cache: Mutex<LruCache<PayloadIdCacheKey, PayloadId>>,
        state: RwLock<State>,
        latest_forkchoice_state: RwLock<Option<ForkchoiceState>>,
        executor: TaskExecutor,
        log: Logger,
    }
    //`ExecutionBackend` is the new trait and `HttpJsonRpc` is the default backend
```
- Then we'll propagate that type parameter change up to the `ExecutionLayer` struct

### Tracing integration in lighthouse
- We'll Replace `slog` and `log` with `tracing` through-out their codebase

## Roadmap
- Here's the estimated timeline for Lighthouse-Reth
    - phase 1 (8 weeks): The actual integration 
    - phase 2 (3 weeks): Testing thoroughly & cleaning-up
    - phase 3 (3 weeks): Getting feedback & iterating accordingly + creating docs

- I'll be doing the tracing interation in Lighthouse parallelly & continuously,It'll be pretty straight-forward for most parts(aside from sse-log streaming).
## Possible challenges

For last ~1.5 years I've been working in the smart-contract security research/auditing space & aside from doing some small contributions here and there I was mostly out of touch from coding anything major for a while,so it can be a bit challenging for me to work at a fast pace initially as I got very rusty.

## Goal of the project
By the end of fellowship,the goal is to 
- Get the [PR](https://github.com/sigp/lighthouse/pull/6070) for tracing integration merged to Lighthouse
- Get the PR with the backend abstraction merged to Lighthouse
- Have a single third repo with Lighthouse integrated with Reth 
- Sync a node on mainnet or a testnet using the direct backend 

## Collaborators

### Fellows 

me

### Mentors

- [Michael Sproul](https://github.com/michaelsproul/)(for lighthouse-reth integration)
- [Eitan Seri-Levi](https://github.com/eserilev)(for tracing integration in lighthouse)

## Resources

[list of resources that I am & will be using](https://hackmd.io/@threehrsleep/list-of-resources-for-my-epf-project)
