<style>
    img {
        width: 100%;
    }
</style>

# Top-10 Most expensive words for Airbnb titles in NYC
###### A brief introduction into Bag-of-Words, N-Grams and CountVectorizer
#### What is the goal of this article?
This article will provide you with general information about the concept of Bag-of-Words and N-Grams. While learning these basic concepts, you will also be provided with code fragments that help to understand the usage of the concepts. The main goal is that after finishing the article, you will be able to analyze the “ Top-10 Most expensive words for Airbnb titles in ___ ”.
#### Airbnb Data
The data used in this article originates from the Inside Airbnb webpage. The data provided is licensed under the Creative Commons Attribution 4.0 International License. Please follow the data policies of Inside Airbnb when using the data.

The Inside Airbnb webpage provides multiple datasets per region, which get regularly updated. For this article we use the listings.csv.gz archive containing a detailed list of all listings. We will also focus on the dataset from New York City, compiled at the 03 June 2022. However, you can choose whatever region or compiling date you want to analyze.
#### What do we need?
Ideally, you already set up your python environment. This could be a simple python script in a preferred IDE or even a python notebook. This article will help you along your way of setting up a notebook.
```
import string
import pandas as pd
import numpy as np

from sklearn.feature_extraction.text import CountVectorizer
```
First, we need the built-in string extension package, which will provide us with some useful collection for later processing. We also need the pandas and numpy package. While numpy adds more mathematical functionality to python (e.g. vector operations), pandas enables us to create Dataframes and manipulate data easily. Additionally, you need to install the scikit-learn (for short sklearn) package, which contains a collection of different AI and Feature-Engineering approaches to, in our case, extract features out of text.
#### Exploratory Data Analysis (EDA)
The goal of an exploratory data analysis is to gain more knowledge over a not yet well-known dataset. It is initially done before you want to analyze the data deeper or extract features for an Artificial Intelligence approach. The collected knowledge will help to minimize the risk of errors in code and making wrong assumptions in the result of an analysis. For this article, we will only focus on a basic dataset cleaning.
```
listings = pd.read_csv('./data/listings_nyc.csv')
listings.info()
```
First, we read the CSV file into a Dataframe and have a look onto the columns the dataset provides. This will result in 74 columns and, 37410 entries for our specific dataset. From the ``.info()`` method, we will also receive the entry count per column.
```
listings = listings[['name', 'price']]
listings = listings.dropna()
listings.head()
```
Since we want to focus on the title and the price of a listing, we need to extract only these columns out of the Dataframe. We can do this by simply indexing the preferred columns by their names and assign the result back to the listings variable. Through the previously acquired knowledge about the entry count per column, we can assume that some columns contain empty cells (Null values) or NaN values. These values can be easily dropped by calling the .dropna() method on the Dataframe. The reason we can just drop these entries is that our dataset contains enough entries to proceed with a valid analysis, and both columns are mandatory to further calculate a result.
```
def remove_punctuation_and_digits(name):    
    clean_name = ''
    for char in name:
        if char not in string.punctuation and char not in string.digits:
            clean_name += char
    return clean_name

remove_punctuation_and_digits_vec = np.vectorize(remove_punctuation_and_digits)
listings['name'] = remove_punctuation_and_digits_vec(listings['name'])
listings.head()
```
If you have a detailed look onto the titles of Airbnb listings, you will notice that a majority of these texts contain digits and punctuation. For the Analysis of the words and the semantic connection of words onto the prices, we don’t want to consider any digits or punctuation. For this reason, we define a function remove_punctuation_and_digits(name) which cleans a given name by simply removing the chars that match any of the both cases. In this case, we decide for using np.vectorize(func) because it is self-explanatory by code and convenient to use.
#### What is Bag-of-Words?
Bag-of-Words is a technique of Natural Language Processing (NLP) that allows to transform a given text into a vector. This is mostly used for extracting features to train an AI model. The process involves two steps — Tokenizing and Vectorizing.
A Tokenizer, mostly applied in a strategy design pattern, has the purpose of generating tokens (in our case words) out of a given text. Because of the interchangeability, you can apply different types of implementation to match your use-case. Additionally, you can provide the Tokenizer with stop words that should be filtered out because they lack of semantic importance.

The Vectorizer takes the tokens generated by the Tokenizer and needs a so-called vocabulary as a reference. The vocabulary is either provided over configuration parameters or automatically generated by tokenizing a set of documents. In our case, the Vectorizer is called a CountVectorizer. Rather than creating binary decisions, if a token from the vocabulary is present in the text (such as a One-Hot-Encoder), the amount of occurrences is provided in the feature vector.
#### How do N-Grams improve the significance of a Bag-of-Words approach?
N-Grams are an N large combination of tokens of a separated text by their natural order of appearance in the text. They project the semantic connection of words by combining them into an N-Tuple.
Since we are using the scikit-learn package for the natural language processing, the default tokenizer can simply be parametrized with an upper and lower N-Gram range. This way, the tokenizer can seamlessly provide the tokens per text and per document for a valid vocabulary.

#### How to use it in Python?
With the scikit-learn package, most of the heavy lifting is done by the CountVectorizer. But since we want to apply the created tokens to the price of an Airbnb listing, we manually need to stack some vectors.
```
def remove_punctuation_and_digits(name):    
    clean_name = ''
    for char in name:
        if char not in string.punctuation and char not in string.digits:
            clean_name += char
    return clean_name

remove_punctuation_and_digits_vec = np.vectorize(remove_punctuation_and_digits)
listings['name'] = remove_punctuation_and_digits_vec(listings['name'])
listings.head()
```
The main goal of the functions are to fit a new vectorizer with each name alone. After finishing fitting of the vectorizer, we can get the generated token (words) out of the instance. These so-called feature names are N-Grams of the range one to two words. The CountVectorizer instance additionally gets configured to ignore stop words of the English language. Since the generated N-Grams only participate in the price of an Airbnb listing, we need to calculate a fraction of the full price. In our case, we assume that all feature name have the same probability in one name of participating in the price. Finally, the created features are stacked to later analyze the connection to the relative price.
```
listings_grouped = listings.groupby(['tag']).sum()
listings_grouped = listings_grouped.sort_values('relative_price', ascending=False)

listings_grouped.head(10)
```
To analyze the Top-10 ranking of the most expensive words for Airbnb titles in NYC, we need to group our extracted words and word combinations together and aggregate them by summing up the relative price. That way, we are able to sort the values afterwards by the relative price.

#### Conclusion
This article gave a brief introduction into Bag-of-Words, N-Grams and especially the CountVectorizer used by the scikit-learn package. It is a quick guide to get a bit more interested into data science. With a relation to a real world dataset, there are even more hidden connections to analyze.