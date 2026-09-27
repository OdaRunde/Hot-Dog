<script lang="ts">
    let { name, breed, born, imageURL} = $props();

    let edit_mode: boolean = $state(false);

    function formatDate(date_string: string): string {
        return new Date(date_string).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
</script>

<div class="card">
    <div class="image-container">
        <img src={imageURL} alt={name}>
        {#if edit_mode === true}
        <div class="image-overlay">
            <input type="file"/>
        </div>
        {/if}
    </div>
    {#if edit_mode === false}
        <div class="info-box">
            <div>{name}</div>
            <div>{breed}</div>
            <div>{formatDate(born)}</div>
            <button onclick={() => edit_mode = !edit_mode} class="button">Edit</button>
        </div>
    {:else}
        <form class="info-box">
            <input type="text" bind:value={name}>
            <input type="text" bind:value={breed}>
            <input type="date" bind:value={born}>
            <button class="button delete-button">Delete</button>
            <button onclick={() => edit_mode = !edit_mode} class="button">Save</button>
        </form>
    {/if}
</div>

<style>
    .card{
        width: 300px;
        aspect-ratio: 1 / 1.5;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: var(--shadow-main);
    }

    .card:hover {
        animation: shake 0.3s;
        transition-duration: 0.3s;
    }

    @keyframes shake {
        0% { transform: translateY(0) }
        50% { transform: translateY(-5px) }
        100% { transform: translateY(0) }
    }

    .image-container {
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .image-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5); /* Black see-through */
    }

    .info-box {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-top: 3px solid var(--color-text-primary);
    }

    input {
        padding: 8px;
        border-radius: 4px;
        background-color: rgb(from var(--color-text-primary) r g b / 8%);
        border: 1px solid rgb(from var(--color-text-primary) r g b / 16%);
        color: var(--color-text-primaryr);
    }

    .delete-button {
        background-color: rgba(255, 55, 55, 0.4);
        color: var(--color-text-primary)
    }

    .delete-button:hover {
        transition-duration: 0.2;
        background-color: rgba(255, 55, 55, 0.8);
    }
</style>
