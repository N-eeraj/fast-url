# Base62 encoder/decoder
ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
BASE = len(ALPHABET)

def base62_encode(num: int) -> str:
    if num == 0:
        return ALPHABET[0]

    result = []

    while num:
        num, rem = divmod(num, BASE)
        result.append(ALPHABET[rem])

    return "".join(reversed(result))

def base62_decode(code: str) -> int:
    num = 0

    for c in code:
        num = num * BASE + ALPHABET.index(c)

    return num


# Feistel permutation
ROUNDS = 6
MASK16 = 0xFFFF

def round_function(right, key):
    return ((right * 1103515245 + key) & 0xFFFFFFFF) >> 16

def feistel_encrypt(value, key=0x12345678):
    left = (value >> 16) & MASK16
    right = value & MASK16

    for i in range(ROUNDS):
        left, right = right, left ^ (round_function(right, key + i) & MASK16)

    return (left << 16) | right

def feistel_decrypt(value, key=0x12345678):
    left = (value >> 16) & MASK16
    right = value & MASK16

    for i in reversed(range(ROUNDS)):
        left, right = right ^ (round_function(left, key + i) & MASK16), left

    return (left << 16) | right


# util functions
def generate_code(id: int) -> str:
    scrambled = feistel_encrypt(id)
    return base62_encode(scrambled)

def recover_id(code: str) -> int:
    scrambled = base62_decode(code)
    return feistel_decrypt(scrambled)
