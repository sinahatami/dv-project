import pandas as pd

file_path = './../Life Expectancy Data.csv'
original_data = pd.read_csv(file_path)

# Exclude countries with data for only one year
country_counts = original_data['Country'].value_counts()
countries_with_sufficient_data = country_counts[country_counts > 1].index.tolist()
filtered_data = original_data[original_data['Country'].isin(countries_with_sufficient_data)]

# Calculate the average total health expenditure for each country
avg_health_expenditure = filtered_data.groupby('Country')['Total expenditure'].mean()

# Select the top 5 countries with sufficient data
top_5_countries = avg_health_expenditure.nlargest(5).index.tolist()

# Filter the original data for these top 5 countries
top_countries_data = filtered_data[filtered_data['Country'].isin(top_5_countries)]

# Ensuring we have sufficient data points for these countries
top_countries_data = top_countries_data[['Year', 'Country', 'Total expenditure']]
top_countries_data = top_countries_data.dropna()

top_countries_data.to_csv('./src/assets/export_file_5.csv', index=False)
