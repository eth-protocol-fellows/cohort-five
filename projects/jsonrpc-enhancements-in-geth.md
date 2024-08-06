# JSON-RPC Enhancements in Geth

## Tagline

Enhancing JSON-RPC capabilities in Geth for better tracing, transaction querying, and standardization across clients.

## Motivation

The current implementation of JSON-RPC in Geth lacks certain advanced features and standardization. This project aims to address the following issues:

- Implementing the `trace_*` namespace, specifically `trace_filter`, which requires an additional index in the database. This feature is essential for developers and analysts who need detailed transaction traces.
- Introducing `eth_getTransactionBySenderAndNonce` to enhance transaction querying capabilities, which can be used to query transaction by EOA address and its nonce.
- Standardizing error codes across JSON-RPC clients to improve interoperability and consistency.
- Benchmarking and optimizing JSON-RPC methods using [flood](https://github.com/paradigmxyz/flood), and comparing performance across different Ethereum clients.

## Project Description

This project proposes to significantly enhance the JSON-RPC API in Geth by implementing new features, standardizing error codes, and optimizing existing methods. Here's a detailed description of each component:

### `trace_*` Namespace Implementation

The `trace_*` namespace provides detailed execution traces of transactions, which are crucial for developers, auditors, and analysts to debug and analyze smart contracts. The current Geth implementation includes basic building blocks of tracers but lacks the comprehensive `trace_filter`, `trace_block` methods available in other clients(eg: [erigon](https://github.com/ledgerwatch/erigon), [reth](https://github.com/paradigmxyz/reth)).

Implementing `trace_*` involves creating an additional index, and extra storage to store the rawdata in the Geth database, to efficiently support the filtering operations. As the trace results are generated in real-time along with the block generating, so we need to store all the results for different tracers(eg: callTracer, prestateTracer...), and the storage should be optimized to handle the large amount of data. And we should also need to consider about the chain reorgs.

- **Trace methods**:
  - `trace_filter`: This method will allow users to filter traces based on criteria such as from/to address.
  - `trace_block`: This method will allow users to get the traces of a block.
- **Integration**: The new tracers will be integrated into the existing JSON-RPC interface, ensuring they are accessible in a manner consistent with other Geth API methods.

### `eth_getTransactionBySenderAndNonce`

The `eth_getTransactionBySenderAndNonce` method will enable users to retrieve transactions based on the sender's address and nonce. This capability is particularly useful for wallets and applications that need to manage and track user transactions efficiently.

We can first lookup the sender+nonce in transaction pool as a short-circuit, if not found, then we can lookup in the database, in database's side, we can build an index such like `sender+nonce -> txhash`, this index can be updated along with the tx-lookup or new block mining.

- **Use Cases**: This feature will improve transaction management in applications, allowing for more precise transaction tracking and conflict resolution.

### Error Codes Standardization

Currently, different Ethereum clients did return the same response for the successful results in most cases, but may return different error codes and messages for similar error conditions, leading to inconsistencies and confusion for developers building cross-client applications. This project aims to standardize error codes across JSON-RPC clients.

Let's collaborate and maintain the [execution-apis](https://github.com/ethereum/execution-apis) to include the most of the error codes.

### Benchmarking and Optimization(Optional)

> This is optional, if we have enough time, we can adapte this.

Performance is critical for JSON-RPC APIs, especially as they are widely used by applications interacting with the Ethereum network. This project will benchmark Geth's JSON-RPC methods and optimize them for better performance.

- **Flood Benchmarking Tool**: Utilize the flood tool to benchmark the performance of various JSON-RPC methods in Geth. Flood simulates high load and measures response times, helping identify bottlenecks.
- **Optimization**: Based on benchmarking results, optimize the implementation of JSON-RPC methods to reduce latency and improve throughput. This may involve optimizing database queries, improving caching mechanisms, and refining the JSON serialization/deserialization processes.
- **Comparison**: Compare Geth's performance with other Ethereum clients to understand relative performance and identify areas for further improvement.

## Specification

### `trace_*` Namespace

- Implement `trace_filter` by creating an additional index in the Geth database.
- Leverage existing building blocks of tracers in Geth to build this feature.
- Ensure compatibility with existing `debug_trace` functionality.

### `eth_getTransactionBySenderAndNonce`

- Follow the specification and guidelines provided in [issue #494](https://github.com/ethereum/execution-apis/issues/494).
- Implement efficient indexing and querying mechanisms to support this method.

### Error Codes Standardization

- Engage with other Ethereum client developers to standardize error codes.
- Implement the standardized error codes in Geth's JSON-RPC API.
- Document the changes and provide guidelines for other clients to adopt the standard.

### Benchmarking and Optimization

- Use [flood](https://github.com/paradigmxyz/flood) to benchmark JSON-RPC methods in Geth.
- Analyze the benchmarking results and identify optimization opportunities.
- Implement performance improvements and compare results with other Ethereum clients.

## Roadmap

1. **Month 1:**

   - Implement `trace_filter`, `trace_block` in the `trace_*` namespace.
   - Start working on `eth_getTransactionBySenderAndNonce`.

2. **Month 2:**

   - Complete the implementation of `eth_getTransactionBySenderAndNonce`.
   - Begin discussions with other Ethereum client developers on standardizing error codes.

3. **Month 3:**

   - Finalize error code standardization and implement changes in Geth.
   - Conduct benchmarking using flood and start optimization work.

4. **Month 4:**

   - Complete optimization of JSON-RPC methods based on benchmarking results.
   - Compare performance with other clients and document findings.

5. **Month 5:**

   - TBD

## Possible Challenges

- Creating an additional index for `trace_filter` without significantly impacting performance.
- Achieving consensus on error code standardization across multiple Ethereum clients.
- Ensuring that the new features do not introduce security vulnerabilities or degrade existing functionalities.

## Goal of the Project

Success for this project will be defined by:

- The successful implementation of `trace_filter`, `trace_block` in the `trace_*` namespace.
- The availability of the `eth_getTransactionBySenderAndNonce` method.
- Standardized error codes across multiple Ethereum clients.
- Improved performance of JSON-RPC methods in Geth, with benchmarking results showcasing the improvements.

## Collaborators

### Fellows

- [jsvisa](https://github.com/jsvisa)

### Mentors

- [Sina](https://github.com/s1na)

## Resources

- [Geth Repository](https://github.com/ethereum/go-ethereum)
- [tracing: investigate persistence · Issue #28643 · ethereum/go-ethereum](https://github.com/ethereum/go-ethereum/issues/28643)
- [Issue #494: eth_getTransactionBySenderAndNonce](https://github.com/ethereum/execution-apis/issues/494)
- [Flood Benchmarking Tool](https://github.com/paradigmxyz/flood)
- [Alchemy Documentation on trace_filter](https://docs.alchemy.com/reference/what-is-trace_filter)
- [The `trace` Module · OpenEthereum Documentation](https://openethereum.github.io/JSONRPC-trace-module)
