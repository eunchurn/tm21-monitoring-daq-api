FROM python:3.6.7-jessie
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD ["python", "detrend.py"]