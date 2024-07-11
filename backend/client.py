import asyncio
import websockets

connected_clients = set()


async def handle_client(websocket, path):
    # Register the new client
    connected_clients.add(websocket)

    join_tasks = [asyncio.create_task(client.send(f"A user has joined the chat. Total users: {len(connected_clients)}"))
                  for client in connected_clients]
    await notify_users(join_tasks)

    try:
        async for message in websocket:
            message_tasks = [asyncio.create_task(client.send(message))
                             for client in connected_clients]
            await asyncio.wait(message_tasks)
    finally:
        connected_clients.remove(websocket)
        leave_tasks = [asyncio.create_task(client.send(f"A user has left the chat. Total users: {len(connected_clients)}"))
                       for client in connected_clients]
        await notify_users(leave_tasks)


async def notify_users(task_list):
    if connected_clients:
        await asyncio.wait(task_list)


async def main():
    server = await websockets.serve(handle_client, "localhost", 6789)
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
