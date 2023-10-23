from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name)

# Configure your Flask app to use Flask-SQLAlchemy with MySQL
# I'll change the configs to use our own configs and environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/database_name'
db = SQLAlchemy(app)

# Define database models
class User(db.Model):
    """
    defines a user/driver depending on designation
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    contact_info = db.Column(db.String(200))

    # Define a one-to-many relationship between User and Shipment
    shipments = db.relationship('Shipment', backref='user', lazy=True)

# Define Shipment model (Called trips in our model)
class Shipment(db.Model):
    """
    defines the trips and shipment progress
    """
    id = db.Column(db.Integer, primary_key=True)
    cargo_type = db.Column(db.String(100), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    origin = db.Column(db.String(200), nullable=False)
    destination = db.Column(db.String(200), nullable=False)
    delivery_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False)

    # Define a foreign key relationship to User
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Define a one-to-many relationship between Shipment and TrackingData
    tracking_data = db.relationship('TrackingData', backref='shipment',
                                    lazy=True)

class TrackingData(db.Model):
    """
    define our tracking data for the vehicles
    """
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    # Define a foreign key relationship to Shipment
    shipment_id = db.Column(db.Integer, db.ForeignKey('shipment.id'),
                            nullable=False)

# Define Truck model
class Truck(db.Model):
    """
    strore truck details
    """
    id = db.Column(db.Integer, primary_key=True)
    registration_number = db.Column(db.String(20), nullable=False)
    capacity = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False)

    # Define a foreign key relationship to User for the driver
    driver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    driver = db.relationship('User', foreign_keys=[driver_id],
                             backref='truck_driver', uselist=False)

    # Additional fields for the Truck model
    vehicle_type = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(200), nullable=True)
    model = db.Column(db.String(50), nullable=True)

if __name__ == '__main__':
    # Create the database tables if they don't exist
    db.create_all()

    app.run()
