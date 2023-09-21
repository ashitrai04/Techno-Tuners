import json
import time

# Initial coordinates for both cars
car1_latitude = [30.726927622718364, 30.726964513265525, 30.726978347217063,
                 30.72699218116662, 30.727038294317477, 30.727070573509952, 30.727112075312945, 30.727144354480707, 30.727181244944916, 30.72720430147787, 30.72722735800532, 30.727245803223305]

car1_longitude = [76.77190902829587, 76.7719412148054, 76.77196267247841, 76.77200022340618,
                  76.77207532526175, 76.77213433386254, 76.77219870688158, 76.77226307990064, 76.77232208850143, 76.77236500384745, 76.772397190357, 76.77243474128477]

car1_speed = [0, 10, 20, 30, 40, 50, 40, 30, 20, 10, 5, 0]


car2_latitude = [30.72607866503916, 30.726193339622714, 30.72631948150707, 30.72643415580417, 30.726560297373425, 30.726634835495833,
                 30.726577498483703, 30.726537362554907, 30.726382552387353, 30.72634815009415, 30.726290812911493, 30.72621627452306, 30.726153203534]
car2_longitude = [76.77322994751339, 76.77310321599175, 76.77304318527096, 76.7729364639896, 76.7728364127883, 76.77277638206752,
                  76.77265632062597, 76.77260295998528, 76.772349496942, 76.77228946622121, 76.77217607485974, 76.77208936381862, 76.7720026527775]

car3_latitude = [30.72798261653038, 30.72792728128881, 30.727885779836797, 30.72783966709137,
                 30.72775666409402, 30.72770132872276, 30.727655215889094, 30.727590657884893, 30.727535322418323, 30.727484598212715, 30.72744770786461, 30.72742465138988, 30.72736931582801, 30.727350870633668, 30.72730475763232, 30.72729553502941, 30.727258644608966, 30.727212531563524, 30.727166418496026, 30.72715719587988, 30.72712952802614, 30.72706958098247]

car3_longitude = [76.77235832421523, 76.77237978188826, 76.77242806165255,
                  76.7724548837438, 76.77253535001763, 76.77256753652715, 76.77262654512795, 76.77267482489223, 76.77273383349304, 76.77276602000255, 76.77275529116605, 76.77272846907478, 76.77264263838272, 76.77259972303668, 76.77253535001763, 76.77249779908985, 76.77241733281605, 76.7723636886335, 76.77228858677793, 76.77224030701365, 76.77219202724936, 76.77214911190333]

car4_latitude = [30.72778532429019, 30.72781299195569, 30.727877549810962,
                 30.72793288508108, 30.727951330164053, 30.727969775243523, 30.728020499193786, 30.72809889070081, 30.72815883710435, 30.728191115921568, 30.728131169538127, 30.72809889070081, 30.72808044564608, 30.72802511046069]

car4_longitude = [76.77332523468893, 76.77337351445321, 76.77344861630878,
                  76.77352908258258, 76.77357199792863, 76.77361491327466, 76.77367392187544, 76.77384021884131, 76.77390459186037, 76.77393677836989, 76.77397432929769, 76.77400115138894, 76.77402797348022, 76.774065524408]

special_car_latitude = [30.72583981025163, 30.725950483099677, 30.72615338299105, 30.726337837067124, 30.72644850934339,
                        30.726554570155553, 30.726642185521044, 30.726522290790285, 30.72635628245533, 30.72626405547906, 30.726217941957806, 30.726116492133468, 30.726070378541632, 30.726070378541632]

special_car_longitude = [76.7714892902835, 76.77168240934066, 76.77199354559939, 76.77225103767557, 76.77244415673273, 76.77262118253512,
                         76.77273383531845, 76.77286258135653, 76.7729966918129, 76.77306642925019, 76.77310398017798, 76.77317908203354, 76.77321126854306, 76.77321126854306 ]


# Create initial JSON data for both cars, including speed data
car1_data = {
    "id": 1,
    "latitude": car1_latitude[0],
    "longitude": car1_longitude[0],
    "name": "Your Vehicle",
    "speed": car1_speed,
}

car2_data = {
    "id": 10,
    "latitude": car2_latitude[0],
    "longitude": car2_longitude[0],
    "name": "Vehicle A",
}

car3_data = {
    "id": 11,
    "latitude": car3_latitude[0],
    "longitude": car3_longitude[0],
    "name": "Vehicle B",
}

car4_data = {
    "id": 12,
    "latitude": car4_latitude[0],
    "longitude": car4_longitude[0],
    "name": "Vehicle B",
}

special_car = {
    "id": 2,
    "latitude": special_car_latitude[0],
    "longitude": special_car_longitude[0],
    "name": "Ambulance",
}

# Create a dictionary to store car data
car_data = {
    "yourVehicle": car1_data,
    "specialVehicle": special_car,
    "vehicles": [car2_data, car3_data, car4_data]
}

# Function to update coordinates


def update_coordinates():
    global car1_latitude, car1_longitude, car2_latitude, car2_longitude, car3_latitude, car3_longitude, car4_latitude, car4_longitude, special_car_latitude, special_car_longitude

    global car1_speed, car2_speed, car3_speed

    while True:
        if car1_latitude:
            car1_data["latitude"] = car1_latitude[0]
            car1_data["longitude"] = car1_longitude[0]
            car1_data["speed"] = car1_speed[0]
            car1_latitude.pop(0)
            car1_longitude.pop(0)
            car1_speed.pop(0)

        if car2_latitude:
            car2_data["latitude"] = car2_latitude[0]
            car2_data["longitude"] = car2_longitude[0]
            car2_latitude.pop(0)
            car2_longitude.pop(0)

        if car3_latitude:
            car3_data["latitude"] = car3_latitude[0]
            car3_data["longitude"] = car3_longitude[0]
            car3_latitude.pop(0)
            car3_longitude.pop(0)

        if car4_latitude:
            car4_data["latitude"] = car4_latitude[0]
            car4_data["longitude"] = car4_longitude[0]
            car4_latitude.pop(0)
            car4_longitude.pop(0)

        if special_car:
            special_car["latitude"] = special_car_latitude[0]
            special_car["longitude"] = special_car_longitude[0]
            special_car_latitude.pop(0)
            special_car_longitude.pop(0)

        # Write updated data to JSON file
        with open("vehicleData.json", "w") as json_file:
            json.dump(car_data, json_file, indent=4)

        # Check if all coordinate lists are empty
        if not (car1_latitude or car2_latitude or car3_latitude or car4_latitude or special_car_latitude):
            print("Coordinate lists are empty. Exiting update_coordinates.")
            break

        time.sleep(2)  # Adjust the sleep time as needed


update_coordinates()
