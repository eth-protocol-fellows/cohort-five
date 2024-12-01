# PeerDAS Metrics Specifications

Improving PeerDAS testing efficiency and research capabilities with unified metrics and an integrated dashboard.

## Motivation

PeerDAS is now in its testing phase, with CL clients actively participating. Identifying and utilizing specific metrics is crucial for evaluating efficiency, troubleshooting, and optimizing the protocol. Before PeerDAS is deployed on the mainnet, detailed testing is important to keep the Ethereum Protocol secure and efficient. This project aims to improve the testing and research process by providing core developers, DevOps, and research teams with easy access to PeerDAS metrics and a consolidated dashboard.

## Project description

PeerDAS Metrics Specifications focuses on identifying the most crucial PeerDAS metrics, standardizing them across consensus clients, and developing a unified Grafana dashboard to visualize these metrics. This setup provides teams with real-time insights, helping them quickly identify issues and optimize client performance.

## Project components
- [PeerDAS metrics specifications](https://github.com/ethereum/beacon-metrics/pull/13)
- [DevOps Grafana dashboard](https://github.com/KatyaRyazantseva/PeerDAS-metrics/blob/main/dashboards/devops-peerdas-dashboard.json)
- [Kurtosis Grafana dashboard](https://github.com/ethpandaops/ethereum-package/blob/main/static_files/grafana-config/dashboards/peerdas-dashboard.json)

## Specification

The project is executed through these specific steps:

1. Monitoring and Visualization

Set up and visualize an initial set of Prometheus metrics using Kurtosis and Grafana. This allows for local testing and initial feedback before moving to devnets.

2. Metrics Review and Expansion

Continuously review the initial metrics, discussing with teams to identify additional metrics that may provide further value.

3. Client Integration

Integrate these standardized metrics into Teku, Grandine, Prysm, and Lighthouse to ensure consistency across the board.

4. Standardization Discussions

Participate in PeerDAS Breakout Rooms to reach consensus on these metrics, supporting collaboration and agreement among different client teams.

5. Feedback and Iteration

Discuss metrics results with mentors and teams, gather feedback and insights, and iteratively improve the metrics and dashboard based on that feedback.

## Roadmap

### **June**

Explore the Ethereum Protocol, understand its current state and challenges, choose the project focus, and learn the tools like Kurtosis and Grafana.

### **July**

Create visualizations of the metrics in Grafana for Lighthouse.

### **August**

Implement the chosen metrics in Grandine.

### **September**

Implement the metrics in Teku. Create a consolidated Grafana dashboard. Analyze the metrics in comparison.

### **October**

Implement the metrics in Prysm. Analyze the metrics to determine their effectiveness, identify missing metrics, and discuss them with the teams.

### **November**

Wrap up the project's findings and present at DevCon.

## Possible challenges

The unpredictable nature of testing outcomes could lead to unexpected discoveries that may alter the project's direction, such as realizing that some metrics are not needed or that a particular metric is essential for the protocol's functionality. The implementation of the metrics on every client could also bring unexpected challenges.

## Goal of the project
The project’s success will be measured by its ability to simplify PeerDAS testing and monitoring for DevOps and Consensus clients teams. It also intends to give researchers reliable insights into PeerDAS simulation and performance. 

## Collaborators

### Fellows 
- [Ekaterina Riazantseva]( https://github.com/KatyaRyazantseva)
- Collaboration with [Hangleang](https://github.com/hangleang) on PeerDAS metrics for Grandine.

### Mentors
DevOps team:
- [Parithosh](https://github.com/parithosh)
- [Barnabas](https://github.com/barnabasbusa)

CL clients:
- [Dmitrii Shmatko](https://github.com/zilm13)
- [Jimmy Chen](https://github.com/jimmygchen)

## Resources
Ethereum Protocol
- [EPF Wiki](https://epf.wiki/)
- [Eth2 book: Upgrading Ethereum](https://eth2book.info/latest/book.pdf)
- [Ethereum Roadmap](https://ethroadmap.com/)
- [EPF Cohort 5](https://github.com/eth-protocol-fellows/cohort-five/tree/main)

Consensus layer
- [Consensus specs](https://github.com/ethereum/consensus-specs)
- [Consensus metrics specs](https://github.com/ethereum/beacon-metrics/blob/master/metrics.md)

PeerDAS
- [EIP-7594: PeerDAS - Peer Data Availability Sampling](https://eips.ethereum.org/EIPS/eip-7594)
- [Consensus specs: EIP-7594 PeerDAS](https://github.com/ethereum/consensus-specs/tree/master/specs/_features/eip7594)
- [PeerDAS by Dapplion, Youtube](https://www.youtube.com/watch?v=fCIPNxGXmmE&t=43s)
- [Danny Ryan: PeerDAS – a simpler DAS approach using battle-tested p2p components](https://ethresear.ch/t/peerdas-a-simpler-das-approach-using-battle-tested-p2p-components/16541)
- [Francesco: From 4844 to Danksharding: a path to scaling Ethereum DA](https://ethresear.ch/t/from-4844-to-danksharding-a-path-to-scaling-ethereum-da/18046)
- [Vitalik Buterin: An explanation of the sharding + DAS proposal](https://hackmd.io/@vbuterin/sharding_proposal)

Kurtosis
- [Kurtosis Ethereum Package](https://github.com/ethpandaops/ethereum-package)
- [Kurtosis: A Deep Dive to Local Devnets](https://ethpandaops.io/posts/kurtosis-deep-dive/)
- [Kurtosis Docs](https://docs.kurtosis.com/)

Grafana
- [Grafana webinars and videos](https://grafana.com/videos/?plcmt=learn-nav)
- [Grafana Docs: Prometheus](https://grafana.com/docs/grafana/latest/datasources/prometheus/)
- [Prometheus types of metrics](https://prometheus.io/docs/tutorials/understanding_metric_types/)
- [Histograms and summaries](https://prometheus.io/docs/practices/histograms/)
