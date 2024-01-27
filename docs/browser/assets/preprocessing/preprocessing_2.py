import pandas as pd

file_path = 'src/assets/Life Expectancy Data.csv'
data = pd.read_csv(file_path)

# Assuming 'Immunization Coverage' can be represented by the average of 'Polio' and 'Diphtheria' and 'Hepatitis B' vaccines coverage
data['Immunization Coverage'] = data[['Polio', 'Diphtheria', 'Hepatitis B']].mean(axis=1)

# Select the most recent data for each country
latest_data = data.sort_values('Year', ascending=False).groupby('Country').first().reset_index()

# Select necessary columns
selected_columns = ['Country', 'Life expectancy', 'Adult Mortality', 'Immunization Coverage']
latest_data = latest_data[selected_columns]

# Scaling 'Life expectancy' for bubble size visualization
latest_data['Bubble Size'] = (latest_data['Life expectancy'] - latest_data['Life expectancy'].min()) / (latest_data['Life expectancy'].max() - latest_data['Life expectancy'].min())
latest_data['Bubble Size'] = latest_data['Bubble Size'] * 100  # Scale up for better visualization

latest_data.to_csv('./src/assets/export_file_2.csv', index=False)
