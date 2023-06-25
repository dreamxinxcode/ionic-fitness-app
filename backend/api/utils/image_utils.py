import os
from uuid import uuid4

def generate_unique_filename(instance, filename):
    # Get the file's extension
    ext = filename.split('.')[-1]
    # Generate a unique filename using UUID4
    unique_filename = f"{uuid4().hex}.{ext}"
    # Return the path where the file should be uploaded
    return os.path.join('uploads', unique_filename)