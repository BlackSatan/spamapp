import pandas as pd
from celery import Celery
# from bayes.celery import app
from main.func import *
# from celery import task

app = Celery(broker='redis://localhost:6379/0')
@app.task
def add_or_delete_message_from_spam(method: str, message: str):
    if method == 'a':
        pddf = pd.read_csv('spam1.csv', encoding='latin-1')
        pddf = pd.concat([pddf, pd.DataFrame(data={'v1': ['spam'] * 10, 'v2': [message] * 10})], sort=True, ignore_index=True)
        pddf.to_csv('spam1.csv')
        pddf = pd.read_csv('spam1.csv', encoding='latin-1')
    elif method == 'd':
        pddf = pd.read_csv('spam1.csv', encoding='latin-1')
        pddf = pddf[pddf['v2'] != message]
        pddf.to_csv('spam1.csv')
        pddf = pd.read_csv('spam1.csv', encoding='latin-1')
    run_train()