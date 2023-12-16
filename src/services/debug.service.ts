const debugDiv = document.querySelector('.debug');

class DebugService {

    public sendDebug(msg: string): void {
        const newDiv = document.createElement('div');
        newDiv.textContent = msg;
        debugDiv?.appendChild(newDiv);

        setTimeout(() => {
            newDiv.remove();
        }, 5000);
    }
}

export const debugService = new DebugService();
