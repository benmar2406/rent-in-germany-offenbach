<script>
    import { base } from '$app/paths';
    const human = `${base}/images/person.png`;
</script>

<div>
<img 
    class="human-icon" 
    src={human} 
    alt="one human"/>
</div>

<style>
.human-icon {
    width: 100%;
    height: 100%;
}
</style>