import json
import random
from faker import Faker

fake = Faker()


brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"]
styles = ["Running", "Basketball", "Soccer", "Casual", "Training", "Walking"]
sizes = [8, 9, 10, 11, 12, 13, 14]
ratings = [round(random.uniform(3.5, 9.0), 1) for _ in range(10)]  


shoe_data = []
for shoe_id in range(1, 1001):
    shoe = {
        "shoeDetails": {
            "shoe_id": shoe_id,
            "size": random.choice(sizes),
            "brand": random.choice(brands),
            "price": round(random.uniform(50.0, 250.0), 2),  
            "style": random.choice(styles),
            "rating": random.choice(ratings),
        }
    }
    shoe_data.append(shoe)


with open('shoes_data.json', 'w') as f:
    json.dump(shoe_data, f, indent=2)

print("JSON file with 1000 shoe details has been generated.")
