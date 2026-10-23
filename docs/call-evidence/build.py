"""Embed the anonymized presentation data; no external dependencies."""
import json
from pathlib import Path

root = Path(__file__).resolve().parent
data = json.dumps(json.loads((root / 'presentation-data.json').read_text()), ensure_ascii=False)
template = (root / 'index.template.html').read_text()
(root / 'index.html').write_text(template.replace('__PRESENTATION_DATA__', data.replace('<', '\\u003c')))
