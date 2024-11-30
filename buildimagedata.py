import json
import ast

def read_txt(filename: str) -> list:
    with open(filename) as f:
        read_data = f.read().rstrip().split('\n\n')
    
    return [s.split('\n') for s in read_data]

def parse_data(data: list):
    result = {}
    for d in data:
        key = d[0]
        s = "".join(d[1:])
        result[key] = ast.literal_eval(s.replace('{', '[').replace('}', ']'))
    return result
        

if __name__ == "__main__":
    data = read_txt("src/test.txt")
    result = parse_data(data)
    with open("src/nimages.json", "w") as jfile:
        json.dump(result, jfile, indent=4)