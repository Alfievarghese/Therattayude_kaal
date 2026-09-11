"""Quick test script for the Therattayude Kaal API."""
import requests
import json

BASE = "http://127.0.0.1:8001"

# Test 1: Root
print("=" * 50)
print("TEST 1: GET /")
r = requests.get(f"{BASE}/")
print(f"Status: {r.status_code}")
print(json.dumps(r.json(), indent=2))

# Test 2: Detect
print("\n" + "=" * 50)
print("TEST 2: POST /detect")
with open(r"D:\USELESS_PROJECT\test_centipede.png", "rb") as f:
    r = requests.post(f"{BASE}/detect", files={"file": ("test.png", f, "image/png")})
print(f"Status: {r.status_code}")
data = r.json()
print(f"Submission ID: {data['submission_id']}")
print(f"Leg count: {data['leg_count']}")
print(f"Confidences (first 5): {data['confidences'][:5]}")
print(f"Annotated image base64 length: {len(data['annotated_image_base64'])}")
print(f"Timestamp: {data['timestamp']}")

sid = data["submission_id"]

# Test 3: Leaderboard
print("\n" + "=" * 50)
print("TEST 3: GET /leaderboard")
r = requests.get(f"{BASE}/leaderboard")
print(f"Status: {r.status_code}")
lb = r.json()
print(f"Entries: {len(lb['entries'])}")
print(f"Total legs: {lb['total_legs']}")
print(f"Lives improved: {lb['lives_improved']}")

# Test 4: Recount
print("\n" + "=" * 50)
print(f"TEST 4: POST /recount/{sid}")
r = requests.post(f"{BASE}/recount/{sid}")
print(f"Status: {r.status_code}")
rc = r.json()
for i, attempt in enumerate(rc["attempts"]):
    print(f"  Attempt {i+1} (conf={attempt['confidence_threshold']}): {attempt['leg_count']} legs")
print(f"Consensus: {rc['consensus']}")
print(f"Dissenters: {rc['dissenting_counts']}")

# Test 5: Certificate
print("\n" + "=" * 50)
print(f"TEST 5: GET /certificate/{sid}")
r = requests.get(f"{BASE}/certificate/{sid}")
print(f"Status: {r.status_code}")
print(f"Content-Type: {r.headers.get('content-type')}")
print(f"Certificate size: {len(r.content)} bytes")
# Save for verification
with open(r"D:\USELESS_PROJECT\test_cert.png", "wb") as f:
    f.write(r.content)
print("Saved to test_cert.png")

print("\n" + "=" * 50)
print("ALL TESTS PASSED!" if all else "SOME TESTS FAILED")
