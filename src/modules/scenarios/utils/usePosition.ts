import { useVectorStore } from '../messages/stores/vector/vectorStore';

export function usePosition(message_id: number, button_id: number) {
  const vector = useVectorStore();
  const mass = [];

  if (vector.connections?.length === 0) return 0;

  for (const connection of vector.connections) {
    if (connection.message_id === message_id) mass.push(connection.button_id);
  }

  mass.push(button_id);

  return mass.indexOf(button_id);
}
