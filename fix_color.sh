#!/bin/bash
cat << 'CSS_EOF' >> src/redoyan/index.css

.dev-portfolio-active,
.dev-portfolio-active * {
  color: inherit;
}
.dev-portfolio-active {
  color: #eae5ec !important;
  background-color: var(--backgroundColor) !important;
}
CSS_EOF
