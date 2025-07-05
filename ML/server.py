from flask import Flask, request, jsonify
from util import select_catalogue_items
from user_prompt_search import search_by_user_prompt

app = Flask(__name__)

@app.route('/')
def home():
    return '''
    <h1>🛍️ Trend-Based Product Recommender</h1>
    <p>Welcome! Use <code>/suggest?trend=your_trend</code> to get product suggestions.</p>
    <p>Or try <code>/search?prompt=your_prompt</code> for prompt-based search.</p>
    '''

@app.route('/suggest', methods=['GET'])
def suggest_items():
    trend = request.args.get('trend')
    if not trend:
        return jsonify({"error": "Missing 'trend' query parameter"}), 400
    try:
        result = select_catalogue_items(trend)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/search', methods=['GET'])
def search_items():
    prompt = request.args.get('prompt')
    if not prompt:
        return jsonify({"error": "Missing 'prompt' query parameter"}), 400
    try:
        result = search_by_user_prompt(prompt)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)
