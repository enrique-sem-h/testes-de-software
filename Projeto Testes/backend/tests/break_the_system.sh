COLLECTION="metrics/StudyHub.postman_collection.json"

LOAD=500
STEP=500
MAX_LOAD=10000

while [ $LOAD -le $MAX_LOAD ]; do
  echo "================================================"
  echo "Testando com carga de $LOAD requisições"
  echo "================================================"

  newman run "$COLLECTION" -n $LOAD
  EXIT_CODE=$?

  if [ $EXIT_CODE -ne 0 ]; then
    echo "ERRO DETECTADO! O sistema quebrou com $LOAD requisições."
    exit 1
  fi

  LOAD=$((LOAD + STEP))
done

echo "O sistema suportou até $MAX_LOAD requisições sem quebrar."
