import pandas as pd

file_path = 'src/assets/Life Expectancy Data.csv'
data = pd.read_csv(file_path)

# Selecting indicators of interest
indicators = ['Life expectancy', 'Adult Mortality', 'Hepatitis B', 'Measles', 'BMI', 'Polio', 'Diphtheria', 'HIV/AIDS', 'GDP', 'Schooling']

# Calculate mean of indicators for each country
country_indicator_means = data.groupby('Country')[indicators].mean()

# Compute an overall mean score for each country by averaging across all indicators
country_indicator_means['Mean Score'] = country_indicator_means.mean(axis=1)

# Sort countries by the overall mean score and take the top 15
top_countries_data = country_indicator_means.sort_values('Mean Score', ascending=False).head(15)

# Standardize the data for better color mapping in the heatmap
top_countries_data_standardized = (top_countries_data - top_countries_data.mean()) / top_countries_data.std()

# Drop the 'Mean Score' as it was only needed for sorting
top_countries_data_standardized = top_countries_data_standardized.drop(columns=['Mean Score'])

top_countries_data_standardized.to_csv('./src/assets/export_file_3.csv')
