# Nepal Tourism Explorer

A small data visualization project exploring international visitor arrivals to Nepal.

The application turns published Nepal Tourism Board tourism statistics into a simple interface that helps users answer two questions:

* How have international visitor arrivals to Nepal changed over time?
* Which countries were the main source markets for visitors in 2025?

## Live Demo

https://nepal-tourism-explorer-khaki.vercel.app/

# Features

* Annual international visitor arrivals from 2019–2025
* Top 10 visitor source markets for 2025
* Summary of 2025 arrivals and recovery compared with 2019
* Loading, error, and empty-data states
* Responsive layout for desktop and mobile

# Tech Stack

* React
* TypeScript
* Vite
* Recharts
* CSS

# Data Source

The data is based on tourism statistics published by the Nepal Tourism Board (NTB).

Source:

Nepal Tourism Board — Nepal Tourism Statistics
https://trade.ntb.gov.np/downloads-cat/nepal-tourism-statistics/

The application uses a small processed copy of the published data so that the deployed application does not depend on a live government endpoint being available at the time a visitor opens the application.

# What the Data Shows

The dataset can be used to understand:

* Changes in recorded international visitor arrivals over time
* The recovery of visitor arrivals after the major decline during 2020–2021
* The main international source markets represented in the 2025 data

# Data Limitations

The figures represent international visitor arrivals published by the Nepal Tourism Board.

Arrival counts do not measure:

* Tourism revenue
* Visitor spending
* Length of stay
* Visitor satisfaction
* Tourism quality
* Overall economic impact
* Future tourism performance

The visualizations therefore describe recorded visitor arrivals and source markets. They should not be used to make causal claims about why tourism increased or decreased.

# Running Locally

1. Clone the repository

git clone <your-repository-url>
cd nepal-tourism-explorer

2. Install dependencies

npm install

3. Start the development server

npm run dev

Open the local URL shown in the terminal.

4. Build for production

npm run build

# Project Scope

This project intentionally focuses on making a small part of the public dataset easier to explore.

It does not attempt to provide:

* A complete tourism information portal
* Hotel or flight information
* Tourism recommendations
* Tourism revenue analysis
* Geographic mapping
* Predictions or forecasting

# Why This Interface?

The original statistics are published as official reports and tables. This project provides a more accessible visual view of two useful aspects of the data: the change in visitor arrivals over time and the countries contributing the largest number of arrivals.

# License

This project is for educational and portfolio purposes. The underlying statistics belong to their respective source organizations.
