
#%%
import gzip

import pandas as pd
import numpy as np
import xml.etree.ElementTree as ET
from collections import defaultdict

jmdict_path = 'data_processing/JMdict.gz'
csv_path = 'data_processing/raw_words.csv'
output_path = 'kanji_vocab_frontend/public/final_words.csv'


# Load data from the provided file
with open(csv_path, "r", encoding="utf-8") as file:
    lines = file.readlines()
#
# # Extract relevant lines (removing headers and other non-relevant lines)
data_lines = [line.strip().split(",") for line in lines if line[0].isdigit()]
#
# Create DataFrame
df = pd.DataFrame(data_lines, columns=['Rank', 'Frequency', 'Word'])

# Decompress and parse the JMdict.gz file
with gzip.open(jmdict_path, 'rt', encoding='utf-8') as f:
    tree = ET.parse(f)
root = tree.getroot()

# Extract words and their corresponding kana readings from JMdict
words_dict = {}
all_dict = set()
has_duplicates = set()

for entry in root.findall('entry'):
    kanji_elements = entry.findall('k_ele/keb')
    for kanji_element in kanji_elements:
        all_dict.add(kanji_element.text)
    reading_elements = entry.findall('r_ele/reb')

    # If there is only one kanji and one reading, add to the dictionary
    if len(reading_elements) == 1:
        for kanji_element in kanji_elements:
            if kanji_element.text in words_dict:
                has_duplicates.add(kanji_element.text)
            words_dict[kanji_element.text] = reading_elements[0].text

# Merge with the initial dataframe
df['Kana'] = df['Word'].map(words_dict)

# Assuming you have a DataFrame named df with a "Frequency" column containing numeric values or strings that can be converted to numbers
# Convert the "Frequency" column to numeric data type and then calculate the logarithm
df['Frequency'] = pd.to_numeric(df['Frequency'], errors='coerce')  # Convert to numeric, coerce errors to NaN
df['Log Frequency'] = np.log(df['Frequency'])
df.drop('Frequency', axis=1, inplace=True)

import re

# 1. Filter out words without kana readings
df_filtered = df.dropna(subset=['Kana'])

# 2. Filter out words without at least one kanji character
kanji_pattern = re.compile(r'[\u4E00-\u9FFF]')
df_filtered = df_filtered[df_filtered['Word'].apply(lambda x: bool(kanji_pattern.search(x)) and x not in has_duplicates)]

# 3. Filter out words that are less than two characters long
df_filtered = df_filtered[df_filtered['Word'].apply(lambda x: len(x) >= 2)]

# Save to CSV
df_filtered.to_csv(output_path, index=False)