from flask import Flask, request, jsonify
from storegenius_pipeline import select_catalogue_items

app = Flask(__name__)

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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=11212, debug=True)
