import math

# Define your fence coordinates as a list of (latitude, longitude) pairs
fence_coordinates = [
    (30.748412, 76.632691), 
    (30.748361, 76.634959),
    (30.746707, 76.635024),
    (30.746595, 76.631769) 
    # Add more coordinates as needed
]

def is_inside_fence(latitude, longitude, fence_coordinates):
    fenceSize = len(fence_coordinates)
    vectors = [[0.0, 0.0] for _ in range(fenceSize)]

    for i in range(fenceSize):
        vectors[i][0] = fence_coordinates[i][0] - latitude
        vectors[i][1] = fence_coordinates[i][1] - longitude

    angle = 0.0
    num, den = 0.0, 0.0

    for i in range(fenceSize):
        num = (vectors[i % fenceSize][0]) * (vectors[(i + 1) % fenceSize][0]) + \
              (vectors[i % fenceSize][1]) * (vectors[(i + 1) % fenceSize][1])
        den = (math.sqrt(pow(vectors[i % fenceSize][0], 2) + pow(vectors[i % fenceSize][1], 2))) * \
              (math.sqrt(pow(vectors[(i + 1) % fenceSize][0], 2) + pow(vectors[(i + 1) % fenceSize][1], 2)))
        angle += (180 * math.acos(num / den) / math.pi)

    if 355 < angle < 365:
        return True
    else:
        return False

# Example latitude and longitude to test
latitude = 30.7476450
longitude = 76.6338541  # Example test point

if is_inside_fence(latitude, longitude, fence_coordinates):
    print("Inside the fence")
else:
    print("Outside the fence")
