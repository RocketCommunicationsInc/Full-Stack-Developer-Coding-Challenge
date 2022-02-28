# Inherit container from Python
FROM python:3.8

# Set the containers working directory.
WORKDIR /code

# Update the PYTHONPATH variable to include the new working directory.
ENV PYTHONPATH "${PYTHONPATH}:/code"

# Copy the requirementst.txt file into the container.
COPY ./requirements.txt /code/requirements.txt

# Update the python packages with the requirements.txt file.
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the code into the container.
COPY ./api /code

# Start the web server listening on port 80.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
