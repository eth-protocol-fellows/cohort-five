# PeerDAS Metrics

Improving PeerDAS testing efficiency via metrics implementation and visualization. 

## Motivation

PeerDAS is now entering its testing phase, with most CL clients actively participating. Identifying and utilizing specific metrics is crucial for evaluating efficiency, troubleshooting, and optimizing the protocol. Before PeerDAS is deployed on the mainnet, detailed testing is important to keep the Ethereum Protocol secure and efficient. The project aims to analyze and present these results in an accessible format for core developers and the research team.

## Project description

PeerDAS Metrics focuses on identifying the most crucial metrics, integrating them into CL clients (Teku, Grandine), and developing visual representations to help teams use these metrics effectively. Additionally, the project will present the analysis of these metrics, providing valuable insights for the research team.

## Specification

The project is executed through these specific steps:

- Monitor and visualize the initial set of metrics using Kurtosis and Grafana.

- Review the initial metrics, identify additional ones that could be beneficial.
- Integrate these metrics into Teku and potentially into Grandine.
- Discuss and potentially develop APIs based on the metrics.
- Visualize these APIs using Dora.
- Discuss the results of the metrics with mentors and teams to gather feedback and insights.

## Roadmap

### **June**

Explore the Ethereum Protocol, understand its current state and challenges, choose the project focus, and learn the tools like Kurtosis, Dora, and Grafana.

### **July**

Create visualizations of the metrics in Grafana for all PeerDAS-implemented clients.

### **August**

Implement the chosen metrics in Teku and Grandine(?).

### **September**

Analyze the metrics to determine their effectiveness, identify missing metrics, and discuss potential additions and APIs with the team.

### **October**

Contribute to the development of APIs and create visualizations for the APIs on Dora.

### **November**

Wrap up the project's findings and present at DevCon.

## Possible challenges

The unpredictable nature of testing outcomes could lead to unexpected discoveries that may alter the project's direction, such as realizing that some metrics are not needed or that a particular metric is essential for the protocol's functionality, or even the realization that there is no need for an API.

## Goal of the project
We define the project being successful as making the PeerDAS testing and monitoring process simpler for DevOps and client teams, and providing the research team with valuable insights into PeerDAS's practical application and performance.

## Collaborators

### Fellows 
- [Ekaterina Riazantseva]( https://github.com/KatyaRyazantseva)
- Potential collaboration with [Hangleang](https://github.com/hangleang) and Ken Kaneki on the PeerDAS metrics of the Grandine. 

### Mentors
DevOps team:
- [Parithosh](https://github.com/parithosh)
- [Barnabas](https://github.com/barnabasbusa)
- [Savid](https://github.com/Savid)
- [pk910](https://github.com/pk910)

CL clients:
- [Dmitrii Shmatko](https://github.com/zilm13)

## Resources
- [PeerDAS – a simpler DAS approach using battle-tested p2p components](https://ethresear.ch/t/peerdas-a-simpler-das-approach-using-battle-tested-p2p-components/16541)
- [From 4844 to Danksharding: a path to scaling Ethereum DA](https://ethresear.ch/t/from-4844-to-danksharding-a-path-to-scaling-ethereum-da/18046)
- [Kurtosis](https://docs.kurtosis.com/)
- [Dora](https://github.com/ethpandaops/dora)
