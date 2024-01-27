import pandas as pd
from sklearn.linear_model import LinearRegression

file_path = 'src/assets/Life Expectancy Data.csv'
data = pd.read_csv(file_path)

# Filter the latest year for each country
latest_data = data.sort_values('Year', ascending=False).groupby('Country').first().reset_index()

# Select Country, GDP, and Life expectancy
scatter_data = latest_data[['Country', 'GDP', 'Life expectancy']].dropna()

# Reshape GDP data for sklearn and fit the regression model
X = scatter_data['GDP'].values.reshape(-1, 1)
y = scatter_data['Life expectancy'].values
model = LinearRegression().fit(X, y)

scatter_data['Predicted Life Expectancy'] = model.predict(X)

scatter_data['Intercept'] = model.intercept_
scatter_data['Coefficient'] = model.coef_[0]
scatter_data.to_csv('./src/assets/export_file_4.csv', index=False)
