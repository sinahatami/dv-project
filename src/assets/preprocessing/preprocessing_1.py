import pandas as pd

file_path = 'src/assets/Life Expectancy Data.csv'
data = pd.read_csv(file_path)

# Average life expectancy for each country
avg_life_expectancy = data.groupby('Country')['Life expectancy'].mean().reset_index()

# Average year-over-year change for each country
data_sorted = data.sort_values(['Country', 'Year'])
data_sorted['YoY_Change'] = data_sorted.groupby('Country')['Life expectancy'].diff()
data_sorted['YoY_Change'] = data_sorted.groupby('Country')['YoY_Change'].transform(lambda x: x.fillna(method='bfill').fillna(method='ffill'))
avg_yoy_change = data_sorted.groupby('Country')['YoY_Change'].mean().reset_index()

# Merge the average life expectancy and average YoY change into one dataframe
combined_life_expectancy_data = pd.merge(avg_life_expectancy, avg_yoy_change, on='Country')

# Selecting the top 50 countries with the highest average life expectancy
top_countries = combined_life_expectancy_data.nlargest(50, 'Life expectancy')

top_countries.to_csv('./src/assets/export_file_1.csv', index=False)